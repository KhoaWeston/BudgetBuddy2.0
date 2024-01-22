import { useContext, useState } from "react";
import './Input.css';
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';
import { Popup } from 'semantic-ui-react';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';


const InputExpense = () => {
  const { user } = useContext(UserContext);

  // This function will be called whenever the user edits the form.
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  
  // sets the form's variables as null to start 
  const [form, setForm] = useState({
    amount: "",
    category: "",
    title: "",
    createdAt: new Date()
  });

  
  // GraphQL query to create an expense
  const createExpenseQuery = gql`
  mutation AddExpense($data: ExpenseInsertInput!) {
    insertOneExpense(data: $data) {
      _id
    }
}
  `;
  

  // All the data that needs to be sent to the GraphQL endpoint
  // to create an expense will be passed through queryVariables.
  const queryVariables = {
    data: {
      title: form.title,
      amount: parseInt(form.amount),
      category: form.category,
      author: user.id,
      createdAt: form.createdAt
    }
  };
  
  // To prove that the identity of the user, we are attaching
  // an Authorization Header with the request
  const headers = { Authorization: `Bearer ${user._accessToken}` };
  
  const onSubmit = async (event) => { // the function that will run when submit expense is pressed
    event.preventDefault();
    const { amount, category, title } = form;
    if (amount.length === 0 || category.length === 0 || title.length === 0) { // error checking that the form values are filled in
      alert("You must enter all fields to submit a expense");
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, createExpenseQuery, queryVariables, headers); // sends the query with the data points to mongodb

      alert("Expense Added to your database!") // alerts the user if sucessfull
    } catch (error) {
      alert(error) // alerts the user if query fails
    }
  };
  
  return(
    <div className="app-container">
      <Header/>
      <div className="input-container">
        <div style={{ textAlign:"right" }}><Popup content=<HelpText/> trigger={<HelpCenterIcon color="disabled" />} /></div>
        <h1>Input Expense Information </h1>
        <input
          className="inputBox"
          placeholder="Enter Title"
          label="Title"
          type="text"
          variant="outlined"
          name="title"
          value={form.title}
          onChange={onFormInputChange}
          fullWidth
          style={{ marginBottom: "1rem" }} 
        />
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
        <input
          className="inputBox"
          placeholder="Enter Category"
          label="Category"
          type="text"
          variant="outlined"
          name="category"
          value={form.category}
          onChange={onFormInputChange}
          fullWidth
          style={{ marginBottom: "1rem" }} 
        />
        <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
          Submit Expense
        </Button>
      </div>
      <Footer/>
    </div>
  );
}

const HelpText = () => (
  <div>
      Fill each field to log your expenses. This includes 
      things you can but back on or do without. Examples of this 
      inlcude entertainment, clothing, or dining out. 
  </div>
);

// the form that is displayed when input expense page is called
export default InputExpense;

