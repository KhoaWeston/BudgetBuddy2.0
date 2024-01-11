import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Button } from '@mui/material'
import { App } from "realm-web";
import { APP_ID } from "../../contexts/realm/constants.js";


const InputGoal=()=>{
    const app = new App(APP_ID); // Creating a Realm App Instance
    const { user } = useContext(UserContext);
    const [selectedgoal, setgoal]= useState(""); // a small function that sets the variable selectedgoal when called

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // sets the form's variables as null to start 
    const [form, setForm] = useState({
      amount: "",
      category: "",
      createdAt: new Date()
    });
  
    // GraphQL query to create an Income
    const createGoalQuery = gql`
    mutation AddGoal($data: GoalInsertInput!) {
      insertOneGoal(data: $data) {
        _id
      }
    }
    `;
  
    // All the data that needs to be sent to the GraphQL endpoint
    // to create an expense will be passed through queryVariables.
    const queryVariables = {
      data: {
        category: selectedgoal,
        amount: parseInt(form.amount),
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const onSubmit = async (event) => { // the function that will run when submit goal is pressed
      event.preventDefault();
      const {amount } = form;
      if (amount.length === 0 || selectedgoal.length ===0 ) { // error checking that the form values are filled in
        alert("You must enter all fields to submit a goal");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createGoalQuery, queryVariables, headers); // sends the query with the data points to mongodb
        alert("Goal Added to your database!") // alerts the user if sucessfull
      } catch (error) {
        alert(error) // alerts the user if query fails
      }
    };

    const ChangeGoal = async(event)=>{ // will run when the user pressed change goal
      const goals = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Goals'); // gathers the collection from mongodb
      try{
        const goal = await goals.findOne(); // finds one goal
        alert("Your current goal states you want to have $" + goal.amount + " in the category: " + goal.category+
        "\nEnter the category and amount that you want to change your goal to and press Submit Goal"); // alerts the user of their current goa
         await goals.deleteOne(); // deletes their current goal
      }catch (error){
          alert("You have no goals at the moment");
        
      }
      
    };

    return(
        <div>
            <Header/>
            <Footer/>
            <div className="input-container">
                <h1>Input Goal Information</h1>
                <input
                    className="inputBox"
                    placeholder="Enter Amount "
                    type="number"
                    variant="outlined"
                    name="amount"
                    value={form.amount}
                    onChange={onFormInputChange}
                    fullwidth
                    style={{ marginBottom: "1rem" }} 
                />
                <select required className="inputSelect" value={selectedgoal} onChange={e => setgoal(e.target.value)}>
                    <option value="" disable selected hidden>Select a category </option>
                    <option value="Emergencies"> Emergencies</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Vacation"> Vacation</option>
                    <option value="Other"> Other</option>
                </select>
                {/* <label>By: <input className="inputDate" type="date" id="by-date" /></label> */}
                <Button variant="contained" onClick={onSubmit} style={{marginRight:"125px"}}>Submit Goal</Button>
                <Button variant="contained" onClick={ChangeGoal} >Change Goal</Button>
            </div>
        </div>
    )
}
// the form that is displayed when input goal page is called
export default InputGoal