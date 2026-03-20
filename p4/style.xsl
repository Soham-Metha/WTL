<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<head>
<title>Employee Data</title>

<style>
table {
    border: 1px solid black;
    width: 40%;
    border-collapse: collapse;
}
th, td {
    border: 1px solid black;
    padding: 5px;
    text-align: left;
}
</style>

</head>

<body>

<table>
<tr bgcolor="#9acd32">
<th>ID</th>
<th>Name</th>
<th>Department</th>
<th>Salary</th>
<th>Joining Date</th>
</tr>

<xsl:for-each select="orgData/employeesData/employee">

<xsl:choose>
<xsl:when test="substring(@id,6) mod 2 = 0">
<tr style="background-color:red;color:white">
<td><xsl:value-of select="@id"/></td>
<td><xsl:value-of select="name"/></td>
<td><xsl:value-of select="department"/></td>
<td><xsl:value-of select="salary"/></td>
<td><xsl:value-of select="JoiningDate"/></td>
</tr>
</xsl:when>

<xsl:otherwise>
<tr style="background-color:blue;color:white">
<td><xsl:value-of select="@id"/></td>
<td><xsl:value-of select="name"/></td>
<td><xsl:value-of select="department"/></td>
<td><xsl:value-of select="salary"/></td>
<td><xsl:value-of select="JoiningDate"/></td>
</tr>
</xsl:otherwise>

</xsl:choose>

</xsl:for-each>

</table>

</body>
</html>

</xsl:template>
</xsl:stylesheet>