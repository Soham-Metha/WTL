import java.io.*;
import java.sql.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/DisplayData")
public class DisplayData extends HttpServlet {

    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest req, HttpServletResponse res)
            throws ServletException, IOException {

        res.setContentType("text/html");
        PrintWriter pw = res.getWriter();

        pw.println("<html><body>");
        pw.println("<h2>Student Records</h2>");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3307/myDB", "root", "");

            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT name,email FROM wtl_p7");

            pw.println("<style>");
            pw.println("table{border-collapse:collapse;margin:auto;}");
            pw.println("th,td{border:1px solid black;padding:8px;}");
            pw.println("th{background:#4CAF50;color:white;}");
            pw.println("</style>");
            pw.println("<table border='1'>");
            pw.println("<tr><th>Name</th><th>Email</th></tr>");

            while (rs.next()) {
                pw.println("<tr>");
                pw.println("<td>" + rs.getString("name") + "</td>");
                pw.println("<td>" + rs.getString("email") + "</td>");
                pw.println("</tr>");
            }

            pw.println("</table>");

            con.close();

        } catch (Exception e) {
            pw.println("Database Error: " + e);
        }

        pw.println("</body></html>");
        pw.close();
    }
}