import { Button, TextField} from "@mui/material";
import {useState } from "react";
import { Link} from "react-router-dom";
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID);
 
const ResetPass = () => {
    const [form, setForm] = useState({ // sets the form's variables as null to start 
        newPass: "",
        newPassCopy: ""
      });
      
      // This function will be called whenever the user edits the form.
      const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };

 const onSubmit = async (event) => { // runs when the user presses the submit button
    event.preventDefault();
    const { newPassCopy, newPass } = form; // takes the variables from the form
    if (newPassCopy.length === 0 || newPass.length === 0 || newPass.valueOf !== newPassCopy.valueOf) { // error checking to ensure the values are not null and match
      alert("Your Passwords do not match, please try again!"); // alerts the user if they do not match
      return;
    }
    try {
        const queryParams = new URLSearchParams(window.location.search); // pulls the current url
        const token = queryParams.get('token'); // puts the url token variable into a node.js variable
        const tokenId = queryParams.get('tokenId'); // puts the url token id variables into a node.js variable

        await app.emailPasswordAuth.resetPassword({ // a mongoDB function that resets the password
            password: newPass,
            token,
            tokenId,
          });
          alert("Password has been changed"); // outputs an alert to the screen saying password has been changed
    } catch (error) { // if successful, it will output the error to the screen 
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
  <p><Link to="/"> Click Here to return to Home</Link></p>
</form>
} // form that will output to the screen when the user runs the reset password
 
export default ResetPass;
