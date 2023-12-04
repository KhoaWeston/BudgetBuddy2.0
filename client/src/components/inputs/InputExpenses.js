import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputExpense = () => {
  const { user } = useContext(UserContext);

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };
  
  // Some prefilled form state
  const [form, setForm] = useState({
    amount: "",
    category: "",
    //mode: "Credit Card",
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
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const { amount, category, title } = form;
    if (amount.length === 0 || category.length === 0 || title.length === 0) {
      alert("You must enter all fields to submit a expense");
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, createExpenseQuery, queryVariables, headers);

      alert("Expense Added to your database!")
    } catch (error) {
      alert(error)
    }
  };
  
  return(
    <div>
      <Header/>
      <Footer/>
      
      <div className="input-container">
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
          placeholder="Enter category"
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
    </div>
  );
}

export default InputExpense;

