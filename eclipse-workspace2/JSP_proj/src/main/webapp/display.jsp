<%@ page import="java.sql.*" %>

<html>
<head>
<title>Student Records</title>

<style>
body{
    font-family: Arial;
    text-align:center;
    background:#f2f2f2;
}

table{
    margin:auto;
    border-collapse:collapse;
    background:white;
}

th,td{
    padding:10px;
    border:1px solid black;
}

th{
    background:#4CAF50;
    color:white;
}
</style>

</head>

<body>

<h2>Student Records</h2>

<%
try{

    Class.forName("com.mysql.cj.jdbc.Driver");

    Connection con = DriverManager.getConnection(
        "jdbc:mysql://localhost:3307/myDB",
        "root",
        ""
    );

    Statement stmt = con.createStatement();

    ResultSet rs = stmt.executeQuery("SELECT name,email FROM wtl_p7");

%>

<table>

<tr>
<th>Name</th>
<th>Email</th>
</tr>

<%
while(rs.next()){
%>

<tr>
<td><%= rs.getString("name") %></td>
<td><%= rs.getString("email") %></td>
</tr>

<%
}
%>

</table>

<%

con.close();

}catch(Exception e){
    out.println("Database Error: " + e);
}
%>

</body>
</html>