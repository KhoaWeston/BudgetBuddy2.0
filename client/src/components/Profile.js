import { Button, TextField } from '@mui/material'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user.context';
import React from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const app = new App(APP_ID);

const Profile=()=>{
    //const { callResetPasswordFunction​ } = useContext(UserContext);
    const { logOutUser } = useContext(UserContext);
    //const expenses = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB');

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
    }
    return(
        <div>
            <Header/>
            <Footer/>
            <div className="container">
            <h2> Your Profile</h2>
            <TextField 
              label= {app.currentUser.profile.email}
              className="email"
              //placeholder={app.currentUser.profile.email}
              fullWidth
              style={{ marginBottom: "1rem" }} 
            />
            <TextField
            
                label="bahhh"
                type="password"
                variant="outlined"
                name="password"
                style={{ marginBottom: "1rem" }}
            />
                <div>password: </div>
                <button>Edit Profile</button>
                <Button variant="contained" onClick={logOut}>Logout</Button>
            </div>
        </div>
    )
}
export default Profile
