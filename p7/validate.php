<?php

$nameErr = "";
$emailErr = "";
$passErr = "";

include "dbconn.php";

/* ---------- REGISTRATION ---------- */

if (
    isset($_POST["name"]) &&
    isset($_POST["email"]) &&
    isset($_POST["pass"]) &&
    empty($_POST["email-login"]) &&
    empty($_POST["pass-login"])
) {

    $name = test_input($_POST["name"]);
    $email = test_input($_POST["email"]);
    $pass = test_input($_POST["pass"]);

    if (!preg_match("/^[a-zA-Z ]{2,30}$/", $name))
        $nameErr = "Name must be between 2 & 30 characters<br>";

    if (!filter_var($email, FILTER_VALIDATE_EMAIL))
        $emailErr = "Invalid email format<br>";

    if (!preg_match("/^[a-zA-Z0-9]{8,15}$/", $pass))
        $passErr = "Password must be alphanumeric (8-15)<br>";

    if ($nameErr == "" && $emailErr == "" && $passErr == "") {

        userRegister($conn,$name,$email,$pass);

        echo "<div class='msg'>Registration Successful</div>";

    } else {

        echo "<div class='msg'>".$nameErr.$emailErr.$passErr."</div>";

    }

}


/* ---------- LOGIN + OPERATIONS ---------- */

if (isset($_POST["email-login"]) && isset($_POST["pass-login"])) {

    $email = test_input($_POST["email-login"]);
    $pass = test_input($_POST["pass-login"]);

    if (login($conn,$email,$pass) == 0) {

        echo "<div class='msg'>INVALID CREDENTIALS! TRY AGAIN</div>";

    } else {

        echo "<h2>Login Successful</h2>";

        /* ----- OPERATIONS ----- */

        if (isset($_POST["update"])) {

            $name = test_input($_POST["name"]);
            $email_new = test_input($_POST["email"]);

            updateRecords($conn,$name,$email_new);

            echo "<div class='msg'>Record Updated</div>";

        }

        if (isset($_POST["delete"])) {

            $name = test_input($_POST["name"]);

            deleteRecords($conn,$name);

            echo "<div class='msg'>Record Deleted</div>";

        }

        ?>

        <div class="crud-section">

            <h3>Database Operations</h3>

            <form class="crud-form" method="post">

                <!-- keep login active -->
                <input type="hidden" name="email-login" value="<?php echo $email; ?>">
                <input type="hidden" name="pass-login" value="<?php echo $pass; ?>">

                <input class="inp2" type="text" name="name" placeholder="Name">
                <input class="inp2" type="email" name="email" placeholder="Email">

                <div class="crud-buttons">
                    <button class="crud-btn update" name="update">Update Email</button>
                    <button class="crud-btn delete" name="delete">Delete Record</button>
                </div>

            </form>

        </div>

        <?php

        fetchNameMail($conn);

    }

}


function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

?>
