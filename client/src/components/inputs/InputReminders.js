import React from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { useContext, useState} from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import emailjs from '@emailjs/browser';
import { App } from "realm-web";
import { APP_ID } from "../../contexts/realm/constants.js";

const InputReminder=()=>{
    const { user } = useContext(UserContext);
    const [selectedperiod, setSelectedperiod]= useState(""); // a small function that sets the variable selectedperiod when called
    const [remindertype,setType]=useState("");
    const app = new App(APP_ID); // Creating a Realm App Instance

    const startReminders = async() =>{ // sets up the the reminders to be executed
    const schedule = require('node-schedule');
    let scheduledperiod ="";
    if (selectedperiod ==="Once a day"){ // setting the string to the time period we want the reminders to run on
      scheduledperiod ='0 0 * * *';
    } else if(selectedperiod ==="Every Other day"){
      scheduledperiod ='0 0 */2 * *';
    } else if(selectedperiod ==="Once a Month"){
      scheduledperiod ='0 0 1 * *';
    } else {
      scheduledperiod ='0 0 1 1 *'; // once a year
    }

    if (remindertype==="Email"){ // will send a reminder in the version they want
      schedule.scheduleJob(scheduledperiod,function(){  // a function that will send an email at the scheduled period
        emailjs.send("BudgetBuddy","template_ep4sf2p",{ // a template I made in email js that will give the email to a user
               message: form.description,
               to_name: app.currentUser.profile.email
               }, 'e9ffixOE5GbV8xB6_');
       });
    }else if ( remindertype==="Text"){
      var txtnum = window.prompt("Enter the phone number to receive Text Messages"); // asks the user for their phone number
      txtnum=txtnum + "@vtext.com"; // currently will only send texts to verizon numbers
      schedule.scheduleJob(scheduledperiod,function(){  // a function that will send an text at the scheduled period
        emailjs.send("BudgetBuddy","template_ep4sf2p",{ // a template I made in email js that will give the text to a user
              message: form.description,
              to_name: txtnum,
              }, 'e9ffixOE5GbV8xB6_');
        });
    }
    else{
      // same code as the above options.. just in one place
      schedule.scheduleJob(scheduledperiod,function(){  
        emailjs.send("BudgetBuddy","template_ep4sf2p",{ 
               message: form.description,
               to_name: app.currentUser.profile.email
               }, 'e9ffixOE5GbV8xB6_');
       });

      var txtnum = window.prompt("Enter the phone number to receive Text Messages");
      txtnum=txtnum + "@vtext.com"; 
      schedule.scheduleJob(scheduledperiod,function(){  
        emailjs.send("BudgetBuddy","template_ep4sf2p",{ 
              message: form.description,
              to_name: txtnum,
              }, 'e9ffixOE5GbV8xB6_');
        });
    }
    }  

    const DeleteReminder=()=>{ // will delete all reminders for the user
      const schedule = require('node-schedule');
      for (const job in schedule.scheduledJobs){
        schedule.scheduledJobs[job].cancel();
      }
      alert("Current Reminders have been deleted!") // alerts the user that they have been deleted
    }

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // sets the form's variables as null to start 
    const [form, setForm] = useState({
      description: "",
      period: "",
      createdAt: new Date()
    });
  
    // GraphQL query to create an Income
    const createReminderQuery = gql`
    mutation AddReminder($data: ReminderInsertInput!) {
      insertOneReminder(data: $data) {
        _id
      }
    }
    `;
  
    // All the data that needs to be sent to the GraphQL endpoint
    // to create an expense will be passed through queryVariables.
    const queryVariables = {
      data: {
        period: selectedperiod,
        description: form.description,
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };
  
    const onSubmit = async (event) => { // the function that will run when submit reminders is pressed
      event.preventDefault();
      console.log(selectedperiod.length);
      if (form.description.length === 0 || selectedperiod.length === 0) { // error checking that the form values are filled in
        alert("You must enter all fields to submit a reminder");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createReminderQuery, queryVariables, headers); // sends the query with the data points to mongodb
        alert("Reminder Added to your database!") // alerts the user if sucessful
        startReminders(); // executes the function that will start reminders
      } catch (error) {
        alert(error) // alerts the user if query fails
      }
    };

    function change(elem) {
      if(elem === "Text"){
        document.getElementById("hiddendrop").style.display = 'block';
      } else {
        document.getElementById("hiddendrop").style.display = 'none';
      }
    };
    
    return(
        <div>
            <Header/>
            <Footer/>
            <form className="input-container">
                <h1>Input Reminder Information</h1>
                <input
                    className="inputBox"
                    placeholder="Enter Description "
                    type="text"
                    variant="outlined"
                    name="description"
                    value={form.description}
                    onChange={onFormInputChange}
                    fullWidth
                    style={{ marginBottom: "1rem" }} 
                />
                <select className="inputSelect" value={selectedperiod} onChange={e => setSelectedperiod(e.target.value)}>
                    <option>  </option>
                    <option value="Once a day"> Once a day</option>
                    <option value="Every Other day"> Every Other Day</option>
                    <option value="Once a Month"> Once a Month</option>
                    <option value="Once a Year"> Once a Year</option>
                </select> 
                <select className="inputSelect" value={remindertype} onChange={e => {setType(e.target.value); change(e.target.value)}}>
                    <option>  </option>
                    <option value="Email"> Email</option>
                    <option value="Text"> Text Message</option>
                    <option value="Both"> Both Email and Text</option>
                </select> 
                <br></br>
                <select className="inputSelect" id="hiddendrop" style={{display: "none"}}>
                    <option>  </option>
                    <option value="Verizon"> Verizon</option>
                    <option value="AT&T"> AT&T</option>
                    <option value="T-Mobile"> T-Mobile</option>
                </select>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={onSubmit} 
                  type="submit"
                  style={{ marginRight:"50px"}}>
                  Submit Reminder
                </Button>
                <Button variant="contained" color="primary" onClick={DeleteReminder}>Delete Reminders</Button>
            </form>
        </div>
    )
} // the form that is displayed when input reminders page is called
export default InputReminder