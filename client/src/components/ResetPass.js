import { Button, TextField} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID);
 
const ResetPass = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
      };

    const [form, setForm] = useState({
        newPass: "",
        newPassCopy: ""
      });
      
      // This function will be called whenever the user edits the form.
      const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };

 const onSubmit = async (event) => {
    event.preventDefault();
    const { newPassCopy, newPass } = form;
    if (newPassCopy.length === 0 || newPass.length === 0 || newPass.valueOf !== newPassCopy.valueOf) {
      alert("Your Passwords do not match, please try again!");
      return;
    }
    try {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const tokenId = queryParams.get('tokenId');

        await app.emailPasswordAuth.resetPassword({
            password: newPass,
            token,
            tokenId,
          });
          alert("Password has been changed");
    } catch (error) {
      alert(error)
    }
  };

  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
  <h1>Reset Password to BudgetBuddy</h1>
  <TextField
    label="Password"
    type="text"
    variant="outlined"
    name= "newPass"
    value={form.newPass}
    onChange={onFormInputChange}
    style={{ marginBottom: "1rem" }}
  />
  <TextField
    label="Re-enter Password"
    type="text"
    variant="outlined"
    name="newPassCopy"
    value={form.newPassCopy}
    onChange={onFormInputChange}
    style={{ marginBottom: "1rem" }}
  />
  <Button variant="contained" color="primary" onClick={onSubmit}>
    Reset Password
  </Button>
  <br></br>
  <Button variant="contained" color="primary" onClick={redirectNow}>
    Return to Home Screen 
  </Button>
</form>
}
 
export default ResetPass;