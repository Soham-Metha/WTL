<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <title> WTL - P7 </title>
</head>

<body style=" overflow: auto;">
    <div class="expTitle"> WTL - P7 </div>
    <div class="card">
        <?php if ($_SERVER["REQUEST_METHOD"] === "POST")
            include "validate.php";
        else { ?>
            <form class="tabs" action="index.php" method="get">
                <input class="inp3" type="Submit" name="access_mode" value="Create account">
                <input class="inp3" type="Submit" name="access_mode" value="Log In">
            </form>
            <form action="index.php" method="post">
                <div style="display:flex;flex-direction:column;">
                    <?php if ($_GET['access_mode'] == "Log In") { ?>
                        <input class="inp2" placeholder="Enter your email" name="email-login" type="email">
                        <input class="inp" placeholder="Enter your password" name="pass-login" type="password">
                        <input class="inp4" type="Submit" value="Login">
                    <?php } else { ?>
                        <input class="inp2" placeholder="Enter your name" name="name" type="text">
                        <input class="inp" placeholder="Enter your email" name="email" type="email">
                        <input class="inp" placeholder="Enter your password" name="pass" type="password">
                    </div>
                    <div class="options">
                        <label class="option"> <input type="radio" name="gender" value="male"> male </label>
                        <label class="option"> <input type="radio" name="gender" value="female"> female </label>

                        <label class="option"> <input type="checkbox" name="terms"> Terms and conditions </label>
                        <label class="option"> <input type="checkbox" name="privacy"> Privacy Policy </label>
                    </div>
                    <input class="inp4" type="Submit" value="Create account">
                <?php }
        } ?>
        </form>
    </div>
</body>

</html>