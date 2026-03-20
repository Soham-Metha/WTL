<?php
$conn = mysqli_connect("localhost:3307", "root", "", "myDB");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

function fetchNameMail($conn)
{
    $sql = "SELECT name,email FROM wtl_p7;";
    $result = mysqli_query($conn, $sql);
    $cnt = mysqli_num_rows($result);
    if ($cnt == 0)
        echo "0";
    else {
        ?>
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
            </tr><?php
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<tr><td>" . $row["name"] . "</td><td>" . $row["email"] . "</td></tr>";
            }
            ?>
        </table>
        <?php
    }
}
function login($conn, $email, $pass)
{
    $sql = "SELECT name,email,password FROM wtl_p7 WHERE email = '" . $email . "' and password = '" . $pass . "';";
    $result = mysqli_query($conn, $sql);
    $c = mysqli_num_rows($result);
    return $c == 1;
}
function userRegister($conn, $name, $email, $pass)
{
    $sql = "INSERT INTO wtl_p7(name,email,password) VALUES('" . $name . "','" . $email . "','" . $pass . "');";
    $result = mysqli_query($conn, $sql);
    return $result;
}
function updateRecords($conn, $name, $email)
{
    $sql = "UPDATE wtl_p7 SET email = '" . $email . "' WHERE name = '" . $name . "';";
    $result = mysqli_query($conn, $sql);
    return $result;
}
function deleteRecords($conn, $name)
{
    $sql = "DELETE FROM wtl_p7 WHERE name = '" . $name . "';";
    $result = mysqli_query($conn, $sql);
    return $result;
}
?>