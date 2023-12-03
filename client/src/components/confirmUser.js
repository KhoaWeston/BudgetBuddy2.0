import { Button, TextField} from "@mui/material";
import {useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";
import { UserContext } from "../contexts/user.context";

const app = new App(APP_ID);

const ConfirmUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
 const onSubmit = async (event) => {
    event.preventDefault();
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const tokenId = queryParams.get('tokenId');

    try {
        await app.emailPasswordAuth.confirmUser({ token, tokenId });
        // User email address confirmed.
        alert("You have successfully made an account");
      } catch (err) {
        alert(err);
      }   
  };

  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
  <h1>Confirm your BudgetBuddy Account</h1>
  <Button variant="contained" color="primary" onClick={onSubmit}>
    Submit Account
  </Button>
  <br></br>
  <p>Sign Into your account now! <Link to="/login"> Click Here to Login</Link></p>
</form>
}
export default ConfirmUser;
