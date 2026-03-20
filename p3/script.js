const p_func = /^(sin|cos|tan|log|sqrt)$/i;

function precedence(op) {
    if (op === '(') return 0;
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/' || op === '%') return 2;
    if (op === '^') return 3;
    if (op === '!') return 4;
    return 0;
}

function is_digit(ch) {
    return (ch >= '0' && ch <= '9') || ch === '.';
}

function factorial(n) {
    if (n < 0) throw "Factorial of negative number";
    if (!Number.isInteger(n)) throw "Factorial requires integer";

    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
}

function applyOp(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': if (b === 0) { throw "Division by zero"; } else { return a / b; }
        case '%': if (b === 0) { throw "Division by zero"; } else { return a % b; }
        case '^': return Math.pow(a, b);
    }
}

function applyFunc(name, x) {
    switch (name) {
        case "sin":  return Math.sin(x * Math.PI / 180);
        case "cos":  return Math.cos(x * Math.PI / 180);
        case "tan":  return Math.tan(x * Math.PI / 180);
        case "log":  return Math.log10(x);
        case "sqrt": return Math.sqrt(x);
        default:     throw "Unknown function: " + name;
    }
}

function perform_opr(values,ops,cond) {
    while (cond()) {
        let op = ops.pop();
        if (op === '!') {
            let a = values.pop();
            values.push(factorial(a));
        } else if (p_func.test(op)) {
            let a = values.pop();
            values.push(applyFunc(op, a));
        } else {
            let b = values.pop();
            let a = values.pop();
            values.push(applyOp(a, b, op));
        }
    }
}

function evaluate(expr) {
    let values = [];
    let ops = [];

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === " ") {
            continue;
        } else if (is_digit(expr[i])) {
            let num = "";
            while (i < expr.length && is_digit(expr[i]))
                num += expr[i++];
            i--;
            values.push(parseFloat(num));

        } else if (expr[i] === '(') {
            ops.push(expr[i]);

        } else if (expr[i] === ')') {
            perform_opr(values,ops,() => ops.length && ops[ops.length - 1] !== '(');
            ops.pop();
            if (ops.length && p_func.test(ops[ops.length - 1])) {
                let fn = ops.pop();
                values.push(applyFunc(fn, values.pop()));
            }

        } else if (/[a-z]/i.test(expr[i])) {
                let name = "";
                while (i < expr.length && /[a-z]/i.test(expr[i]))
                    name += expr[i++];
                i--;
            
                if (name === "pi") values.push(Math.PI);
                else if (name === "e") values.push(Math.E);
                else if (p_func.test(name)) ops.push(name);
                else throw "Unknown function: " + name;
            
        } else if ("+-*/%^!".includes(expr[i])) {

            if (expr[i] !== '!') {
                perform_opr(values,ops,() => {
                    if (!ops.length || ops[ops.length - 1] === '(') return false;
                    if ("^".includes(expr[i])) // right assoc
                        return precedence(ops[ops.length - 1]) > precedence(expr[i]);
                    else
                        return precedence(ops[ops.length - 1]) >= precedence(expr[i]);
                });

            }
            ops.push(expr[i]);
        }
    }

    perform_opr(values,ops,() => ops.length);

    if (values.length > 1)
        throw "Invalid expression! leftover operands after evaluation.";

    return values.pop();
}

// ===============================================================

function press(val) {
    document.getElementById("display").value += val;
}

function backspace() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function invalid_paren(expr) {
    let val = 0;
    for (let i = 0; i < expr.length; i++) {
        if (expr[i]=='(') val++;
        if (expr[i]==')') val--;
        if (val < 0) return true;
    }
    return val;
}

function calculate() {
    let p_exp      = /^[a-z+\-*/%^!.0-9() ]+$/i;
    let p_inv_strt = /^[+\-*/%^!]/;
    let p_inv_end  =  /[+\-*/%^]$/;
    let p_dub_opr  =  /[+\-*/%^]{2,}/;
    let p_dub_dot  =  /[.]{2,}/;
    let exp = document.getElementById("display").value.trim();

    try {
        if (exp === "")                  { throw "Please enter an expression.";
        } else if (!p_exp.test(exp))     { throw "Invalid characters detected.";
        } else if (p_inv_strt.test(exp)) { throw "Expression cannot start with an operator.";
        } else if (p_inv_end.test(exp))  { throw "Expression cannot end with an operator.";
        } else if (p_dub_opr.test(exp))  { throw "Two operators cannot appear together.";
        } else if (p_dub_dot.test(exp))  { throw "Two dots (.) cannot appear together.";
        } else if (invalid_paren(exp))   { throw "Mismatched parentheses.";
        } else {
            let ans = evaluate(exp);
            document.getElementById("display").value = ans;
            let history = document.getElementById("historyList");
            let item = document.createElement("li");
            item.className = "history-item";
            item.innerHTML =
                `<span class="hist-exp">${exp}</span>
                <span class="hist-res">${ans}</span>`;

            history.prepend(item);
            // if (history.children.length > 10) {
            //     history.removeChild(history.lastChild);
            // }

        }
    }
    catch (err) {
        alert(err);
        clearDisplay();
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (is_digit(key) || "+-*/%^!()".includes(key)) {
        press(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        backspace();
    } else if (key === "Escape") {
        clearDisplay();
    }
});

// function init() {
//     document.getElementById("calcForm").addEventListener("submit", function (e) {
//         e.preventDefault();
//         num1 = document.getElementById("num1").value;
//         num2 = document.getElementById("num2").value;
//         op = document.getElementById("operator").value;
//         calculate();
//     if (num1 === "" || num2 === "") { alert("Please enter both numbers"); return; }
//     if (isNaN(num1) || isNaN(num2)) { alert("Inputs must be valid numbers"); return; }
//     num1 = parseFloat(num1); 
//     num2 = parseFloat(num2);
//     let ans; 
//     switch (op) {
//         case "+": ans = num1 + num2; break;
//         case "-": ans = num1 - num2; break;
//         case "*": ans = num1 * num2; break;
//         case "/": if (num2 === 0) { alert("Cannot divide by zero"); return; } ans = num1 / num2; break;
//         default: alert("Please select an operator"); return;
//     }
//     alert(num1 + op + num2 + " = " + ans);
//     });
// }