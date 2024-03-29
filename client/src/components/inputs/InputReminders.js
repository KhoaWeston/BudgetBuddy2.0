import React from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';
import './Input.css';
import { useContext, useState} from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import emailjs from '@emailjs/browser';
import { App } from "realm-web";
import { APP_ID } from "../../contexts/realm/constants.js";
import { Popup } from 'semantic-ui-react';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const InputReminder=()=>{
    const { user } = useContext(UserContext);
    const [selectedperiod, setSelectedperiod]= useState(""); // a small function that sets the variable selectedperiod when called
    const [txtnum, setTxtNum]= useState("");
    const [provider, setProvider]= useState("");
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
        var email = txtnum+provider;
        schedule.scheduleJob(scheduledperiod,function(){  // a function that will send an text at the scheduled period
          emailjs.send("BudgetBuddy","template_ep4sf2p",{ // a template I made in email js that will give the text to a user
              message: form.description,
              to_name: email,
            }, 'e9ffixOE5GbV8xB6_');
        });
      }
      else{
        var email = txtnum+provider;
        // same code as the above options.. just in one place
        schedule.scheduleJob(scheduledperiod,function(){  
          emailjs.send("BudgetBuddy","template_ep4sf2p",{ 
            message: form.description,
            to_name: app.currentUser.profile.email
          }, 'e9ffixOE5GbV8xB6_');
        });
      
        schedule.scheduleJob(scheduledperiod,function(){  
          emailjs.send("BudgetBuddy","template_ep4sf2p",{ 
            message: form.description,
            to_name: email,
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
      if(remindertype === "Text" || remindertype === "Both"){ // checking the reminder type for correct error checking
        if(isNaN(txtnum) || txtnum.length !== 10){ // making sure they input an actual 10 digit number with no letters or characters
          alert("Please input the phone number in the format provided");
          return;
        }
        if (txtnum.length === 0 || provider.length ===0){// error checking on the number and provider
          alert("You must enter all fields to submit a reminder");
          return;
        }
      }
      if (form.description.length === 0  || selectedperiod.length === 0 || remindertype.length === 0) { // error checking that the form values are filled in
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

    function change(elem) { // keeps phone number inputs hidden until they choose text
      if(elem === "Text" || elem === "Both"){
        document.getElementById("hiddendrop").style.display = 'inline';
        document.getElementById("hiddendrop1").style.display = 'inline';
      } else {
        document.getElementById("hiddendrop1").style.display = 'none';
        document.getElementById("hiddendrop").style.display = 'none';
      }
    };
    
    return(
        <div className="app-container">
            <Header/>
            <div className="input-container">
                <div style={{ textAlign:"right" }}><Popup content=<HelpText/> trigger={<HelpCenterIcon color="disabled" />} /></div>
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
                <select required className="inputSelect" value={selectedperiod} onChange={e => setSelectedperiod(e.target.value)}>
                    <option value="" disable selected hidden>Select a period </option>
                    <option value="Once a day"> Once a day</option>
                    <option value="Every Other day"> Every Other Day</option>
                    <option value="Once a Month"> Once a Month</option>
                    <option value="Once a Year"> Once a Year</option>
                </select> 
                <select required className="inputSelect" value={remindertype} onChange={e => {setType(e.target.value); change(e.target.value)}}>
                    <option value="" disable selected hidden>Select a type </option>
                    <option value="Email"> Email</option>
                    <option value="Text"> Text Message</option>
                    <option value="Both"> Both Email and Text</option>
                </select> 
                <input 
                    className="inputBox"
                    placeholder="Enter Phone Number (as ********** NO dashes) "
                    id="hiddendrop1"
                    type="text"
                    variant="outlined"
                    name="number"
                    value={form.number}
                    onChange={e => setTxtNum(e.target.value)}
                    fullWidth
                    style={{display: "none", marginBottom:"20px"}}
                />
                <select className="inputSelect" id="hiddendrop" style={{display: "none"}} onChange={e => {setProvider(e.target.value);}}>
                    <option value="" disable selected hidden>Select a provider </option>
                    <option value="@vtext.com"> Verizon</option>
                    <option value="@txt.att.net"> AT&T</option>
                    <option value="@tmomail.net"> T-Mobile</option>
                    <option value="@messaging.sprintpcs.com"> Sprint</option>
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
            </div>
            <Footer/>
        </div>
    )
} 

const HelpText = () => (
  <div>
      Fill each field to log your reminders. BudgetBuddy can help you 
      keep to your goals by notifying you periodically to stay on path
      your goal via email or text message. 
  </div>
);

// the form that is displayed when input reminders page is called
export default InputReminder