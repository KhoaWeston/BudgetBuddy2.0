import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
 
const Login = () => {
 const navigate = useNavigate(); // used in redirectNow()
 const location = useLocation();

 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
 
 // sets the form's variables as null to start 
 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // This function will be called whenever the user edits the form.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 // this function will redirect the user to the home screen
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // Once a user logs in to our app, we don’t want to ask them for their information everytime they switch pages
 // so this makes sure we don't ask them everytime
 const loadUser = async () => {
   if (!user) {
     const fetchedUser = await fetchUser();
     if (fetchedUser) { // if they are logged in it will redirect them
       redirectNow();
     }
   }
 }
 
 // This useEffect will run only once when the component is mounted.
 // Hence this is helping us in verifying whether the user is already logged in
 // or not.
 useEffect(() => {
   loadUser(); 
 });
 
 // This function runs when the user hits login
 const onSubmit = async (event) => {
   try {
     const user = await emailPasswordLogin(form.email, form.password); // logins in the userwith mongodb function
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!"); // if they are not a user it will tell them this
      } else {
          alert(error);
      } 
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "360px", margin: "auto", marginTop:"100px"}}>
   <h1>Login to BudgetBuddy</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Login
   </Button>
   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
 </form>
}
 // the form that is displayed when the login screen is clicked
export default Login;