import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Header from '../Header.js';
import Footer from '../Footer.js';

const CreateExpense = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // Some prefilled form state
    const [form, setForm] = useState({
      amount: "640",
      category: "Education",
      //mode: "Credit Card",
      title: "Online Course",
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
       // mode: form.mode,
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
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createExpenseQuery, queryVariables, headers);
  
        // Navigate to the Home page after creating an expense
        navigate(`/`);
      } catch (error) {
        alert(error)
      }
    };
  
    return(
        <div>
            <Header/>
            <Footer/>
            <h1>Input Expense Information </h1>
            <form onSubmit={onSubmit} style={{ maxWidth: "200px", margin: "auto" }}>
                <input
                label="Title"
                type="text"
                variant="outlined"
                name="title"
                value={form.title}
                onChange={onFormInputChange}
                fullWidth
                style={{ marginBottom: "1rem" }} />
                <input
                    label="Amount"
                    type="number"
                    variant="outlined"
                    name="amount"
                    value={form.amount}
                    onChange={onFormInputChange}
                    fullWidth
                    style={{ marginBottom: "1rem" }} />
                <input
                    label="Category"
                    type="text"
                    variant="outlined"
                    name="category"
                    value={form.category}
                    onChange={onFormInputChange}
                    fullWidth
                    style={{ marginBottom: "1rem" }} />
                <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
                    Submit Expense
                </Button>
            </form>
        </div>
    );
  }
  
  export default CreateExpense;