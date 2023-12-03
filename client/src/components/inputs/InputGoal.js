import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Button } from '@mui/material'


const InputGoal=()=>{
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
      if (form.amount === 0 || selectedgoal.valueOf ==="") {
        alert("wrong!");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createGoalQuery, queryVariables, headers);
        alert("Goal Added to your database!")
      } catch (error) {
        alert(error)
      }
    };

    return(
        <div>
            <Header/>
            <Footer/>
            <div className="input-container">
                <h1>Input goal information</h1>
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
                <div><input className="inputDate" type="date" id="goal-date" /></div>
                <Button variant="contained" onClick={onSubmit} >Enter</Button>
            </div>
        </div>
    )
}
export default InputGoal