import org.apache.struts.action.*;
import javax.servlet.http.HttpServletRequest;

public class LoginForm extends ActionForm {
    private static final long serialVersionUID = 1L;
    private String name;
    private String mobile;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public ActionErrors validate(ActionMapping mapping, HttpServletRequest request) {
        ActionErrors errors = new ActionErrors();

        // Name
        if (name == null || name.trim().isEmpty()) {
            errors.add("name", new ActionMessage("error.name.required"));
        } else if (!name.matches("[a-zA-Z ]+")) {
            errors.add("name", new ActionMessage("error.name.invalid"));
        }

        // Mobile
        if (mobile == null || mobile.trim().isEmpty()) {
            errors.add("mobile", new ActionMessage("error.mobile.required"));
        } else if (!mobile.matches("\\d{10}")) {
            errors.add("mobile", new ActionMessage("error.mobile.invalid"));
        }

        // Email
        if (email == null || email.trim().isEmpty()) {
            errors.add("email", new ActionMessage("error.email.required"));
        } else if (!email.matches("^[\\w.-]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            errors.add("email", new ActionMessage("error.email.invalid"));
        }
        return errors;
    }
}