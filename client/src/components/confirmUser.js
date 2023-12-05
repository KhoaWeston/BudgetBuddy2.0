import { Button} from "@mui/material";
import { Link} from "react-router-dom";
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID); // Creating a Realm App Instance

const ConfirmUser = () => {

 const onSubmit = async (event) => { // the function that will run when the form is submitted
    event.preventDefault();
    const queryParams = new URLSearchParams(window.location.search); // searches the url
    const token = queryParams.get('token'); // puts the url variable token into a node.js variable
    const tokenId = queryParams.get('tokenId'); // puts the url variable tokenid into a node.js variable

    try {
        await app.emailPasswordAuth.confirmUser({ token, tokenId }); // built in mongodb function that will confirm the user has tried to sign up 
        alert("You have successfully made an account"); // outputs an alert to the website 
      } catch (err) {// if not successful, will output an alert that states the error
        alert(err);
      }   
  };

  return(
    <div>
      <h1 style={{maxWidth: "520px", margin: "auto", marginTop:"200px", marginBottom:"20px"}}>Confirm your BudgetBuddy Account</h1>
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "360px", margin: "auto" }}> 
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Confirm Account
        </Button>
        <p>Sign Into your account now! <Link to="/login"> Click Here to Login</Link></p>
      </form>
    </div>
  );
}// ^^ returns a form that will have a header and a button... this is what is display to the screen when the user is on the corfirm page
export default ConfirmUser;
