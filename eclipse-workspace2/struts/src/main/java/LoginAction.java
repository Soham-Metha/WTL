import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.Action;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

public class LoginAction extends Action {
    @Override
    public ActionForward execute(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response) {

        LoginForm loginForm = (LoginForm) form;

        ActionErrors errors = loginForm.validate(mapping, request);

        if (!errors.isEmpty()) {
            saveErrors(request, errors);
        }

        request.setAttribute("name", loginForm.getName());
        return mapping.findForward("success");
    }
}