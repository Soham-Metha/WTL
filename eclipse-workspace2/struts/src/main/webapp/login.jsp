<%@ taglib uri="http://struts.apache.org/tags-html" prefix="html"%>
<%@ taglib uri="http://struts.apache.org/tags-bean" prefix="bean"%>
<html>
<head>
    <title>Login Page</title>
</head>
<body>
    <h2>Login Page</h2>

    <html:form action="/login.do">
        <table>
            <tr>
                <td>Name:</td>
                <td><html:text property="name"/></td>
                <td><html:errors property="name"/></td>
            </tr>
            <tr>
                <td>Mobile Number:</td>
                <td><html:text property="mobile"/></td>
                <td><html:errors property="mobile"/></td>
            </tr>
            <tr>
                <td>Email ID:</td>
                <td><html:text property="email"/></td>
                <td><html:errors property="email"/></td>
            </tr>
            <tr>
                <td colspan="2">
                    <html:submit>Login</html:submit>
                </td>
            </tr>
        </table>
    </html:form>
</body>
</html>