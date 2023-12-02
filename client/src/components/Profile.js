import { Button, TextField} from '@mui/material'
import { useContext} from 'react';
import { UserContext } from '../contexts/user.context';
import React from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID);

const Profile=()=>{
    const { logOutUser} = useContext(UserContext);

    // This function is called when the user clicks the "Logout" button.
    const logOut = async () => {
        try {
            // Calling the logOutUser function from the user context.
            const loggedOut = await logOutUser();
            // Now we will refresh the page, and the user will be logged out and
            // redirected to the login page because of the <PrivateRoute /> component.
            if (loggedOut) {
            window.location.reload(true);
            }
        } catch (error) {
            alert(error)
        }
    };
    
    const ResetPassword = async () => {
        try {
            const email = app.currentUser.profile.email;
            await app.emailPasswordAuth.sendResetPasswordEmail({email});
            alert("Reset Password Email has been sent")
        } catch (error) {
            alert("Error in sending Reset Password Email")
        }
    }
    return(
        <div>
            <Header/>
            <Footer/>
            <form style={{ flex:1, justifyContent: "center", alignitems:"center", maxWidth: "500px", margin: "auto"}}>
                <h1> Your Profile</h1>
                <div>
                    <u1>email: </u1>
                    <TextField 
                    label= {app.currentUser.profile.email}
                    className="email"   
                    style={{ marginBottom: "1rem" }} 
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        style={{ marginBottom: "1rem" }}
                        onClick={ResetPassword}>
                        Reset Password 
                    </Button>
                </div>
                <Button variant="contained" onClick={logOut}>Logout</Button>
            </form>
        </div>
    )
}
export default Profile
