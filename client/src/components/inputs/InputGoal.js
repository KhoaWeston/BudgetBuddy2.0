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
    const app = new App(APP_ID);
    const { user } = useContext(UserContext);
    const [selectedgoal, setgoal]= useState("");

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // Some prefilled form state
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

  
    const onSubmit = async (event) => {
      event.preventDefault();
      const {amount,category } = form;
      if (amount === 0 || category.valueOf.length ===0) {
        alert("You must enter all fields to submit a goal");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createGoalQuery, queryVariables, headers);
        alert("Goal Added to your database!")
      } catch (error) {
        alert(error)
      }
    };

    const ChangeGoal = async(event)=>{
      const goals = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Goals');
      const goal = await goals.findOne();
      form.amount = goal.amount;
      form.category = goal.category;
      alert("Your current goal states you want to have $" + goal.amount + " in the category: " + goal.category+
      "\nEnter the category and amount that you want to change your goal to and press Enter Goal");
      const goal_deleted = await goals.deleteOne();
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
                    type="text"
                    variant="outlined"
                    name="amount"
                    value={form.amount}
                    onChange={onFormInputChange}
                    fullWidth
                    style={{ marginBottom: "1rem" }} 
                />
                <select className="inputSelect" value={selectedgoal} onChange={e => setgoal(e.target.value)}>
                    <option value=" ">  </option>
                    <option value="Emergencies"> Emergencies</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Vacation"> Vacation</option>
                    <option value="Other"> Other</option>
                </select>
                <Button variant="contained" onClick={onSubmit} style={{marginRight:"130px"}}>Submit Goal</Button>
                <Button variant="contained" onClick={ChangeGoal} >Change Goal</Button>
            </div>
        </div>
    )
}
export default InputGoal