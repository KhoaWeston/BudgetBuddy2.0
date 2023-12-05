import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

 
const Register = () => {
 const navigate = useNavigate(); // used in the redirect function 
 const location = useLocation();
 
 
 const { emailPasswordSignup } = useContext(UserContext);
 const [form, setForm] = useState({ // sets the form's variables as null to start 
   email: "",
   password: ""
 });
 
// This function will be called whenever the user edits the form.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 
 // will redirect the user to the home screen after they sign in
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // runs when the user presses the submit button
 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(form.email, form.password); // mongodb function that will sign up the user
     if (user) {
       redirectNow(); // if they are a user then it will redirect them to the home screen
     }
   } catch (error) {
     alert(error); // if not a user gives them an error alert
   }
 };
 
 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "360px", margin: "auto", marginTop:"100px" }}>
   <h1>Signup for BudgetBuddy</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Signup
   </Button>
   <p>Have an account already? <Link to="/login">Login</Link></p> 
 </form>
}
 // form that appears then the register app is called
export default Register;