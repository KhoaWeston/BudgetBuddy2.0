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
            <form style={{ flex:1, justifyContent: "center", alignitems:"center", maxWidth: "500px", margin: "auto"}}>
                <h1> Your Profile</h1>
                <div>
                    <u1>email: </u1>
                    <TextField 
                    label= {app.currentUser.profile.email}
                    className="email"
                    //placeholder={app.currentUser.profile.email}
                    
                    style={{ marginBottom: "1rem" }} 
                    />
                </div>
                <div>
                    <u1>password: </u1>
                    <TextField
                        name="password"
                        label="dunno"
                        type="password"
                        variant="outlined"
                        style={{ marginBottom: "1rem" }}
                    />
                </div>
                {/* <button>Edit Profile</button> */}
                <Button variant="contained" onClick={logOut}>Logout</Button>
            </form>
        </div>
    )
}
export default Profile
