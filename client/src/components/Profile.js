import { Button } from '@mui/material'
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/user.context';
import React from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID);

const Profile=()=>{
    const { logOutUser } = useContext(UserContext);
    const [userEmail, setEmail] = useState("");

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
    
    const ResetPassword = async () => { // this function will run when the reset Password button is pressed
        try {
            const email = app.currentUser.profile.email; // takes the current user's email
            await app.emailPasswordAuth.sendResetPasswordEmail({email}); // mongoDB function that send them an email
            alert("Reset Password Email has been sent") // alerts the user that the email has been sent
        } catch (error) {
            alert("Error in sending Reset Password Email")
        }
    }

    const getUserEmail = async () => {
        try {
            setEmail(app.currentUser.profile.email);
        } catch (error) {
            //alert("Reload the page (Ctrl+R)")
        }
    }

    useEffect(() => {
        getUserEmail();
    });

    return(
        <div>
            <Header/>
            <Footer/>
            <div className="input-container">
                <h1> Your Profile</h1>
                <label>Email: {userEmail} </label>
                <div>
                    <Button
                        variant="contained"
                        style={{ marginTop: "20px", marginBottom: "20px"}}
                        onClick={ResetPassword}>
                        Reset Password 
                    </Button>
                </div>
                <Button variant="contained" onClick={logOut}>Logout</Button>
            </div>
        </div>
    )
}
// the form that will display when the profile page is called
export default Profile
