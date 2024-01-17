import { useContext, useState } from "react";
import './Input.css';
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputSavings = () => {
  const { user } = useContext(UserContext);
  const [selectedsavings, setsavings]= useState(""); // a small function that sets the variable selected savings when called

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
  
  // GraphQL query to create a debt
  const createSavingsQuery = gql`
  mutation AddSaving($data: SavingInsertInput!) {
    insertOneSaving(data: $data) {
      _id
    }
  }
  `;
  
  // All the data that needs to be sent to the GraphQL endpoint
  // to create an expense will be passed through queryVariables.
  const queryVariables = {
    data: {
      category: selectedsavings,
      amount: parseInt(form.amount),
      author: user.id,
      createdAt: form.createdAt
    }
  };
  
  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };

  const onSubmit = async (event) => { // this function will be called when the user hits submit saving
    event.preventDefault();
    const {amount } = form; // pulls amount variable from the form
      if (amount.length === 0 || selectedsavings.length === 0 ) { // error checking to make sure values are not null
        alert("You must enter all fields to submit a saving");
        return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, createSavingsQuery, queryVariables, headers); // will send the request to mongodb
      alert("Savings Added to your database!") // if it works it will alert the user
    } catch (error) {
      alert(error) // if it doesn't work it will alert the user the error
    }
  };
  
  return(
    <div className="app-container">
      <Header/>
      <div className="input-container">
        <h1>Input Savings Information </h1>
        <input
          className="inputBox"
          placeholder="Enter Amount"
          label="Amount"
          type="number"
          variant="outlined"
          name="amount"
          value={form.amount}
          onChange={onFormInputChange}
          fullWidth
          style={{ marginBottom: "1rem" }} 
        />
        <select required className="inputSelect" value={selectedsavings} onChange={e => setsavings(e.target.value)}>
          <option value="" disable selected hidden>Select a category </option>
          <option value="Emergencies"> Emergencies</option>
          <option value="Retirement">Retirement</option>
          <option value="Vacation"> Vacation</option>
          <option value="Other"> Other</option>
        </select>
        <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
          Submit Savings
        </Button>
      </div>
      <Footer/>
    </div>
  );
}
  // the form that is displayed when the input savings screen is clicked on
  export default InputSavings;
    
    