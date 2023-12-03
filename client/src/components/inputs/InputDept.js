import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputDebt = () => {
    const { user } = useContext(UserContext);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // Some prefilled form state
    const [form, setForm] = useState({
      amount: "",
      title: "",
      createdAt: new Date()
    });
  
    // GraphQL query to create an debt
    const createDebtQuery = gql`
    mutation AddDebt($data: DebtInsertInput!) {
      insertOneDebt(data: $data) {
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
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const { amount, title } = form;
      if (amount.length === 0 || title.length === 0) {
        alert("You must enter all fields to submit a debt");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createDebtQuery, queryVariables, headers);
        alert("Debt Added to your database!")
      } catch (error) {
        alert(error)
      }
    };
  
    return(
        <div>
          <Header/>
          <Footer/>
          
          <div className="input-container">
            <h1>Input Debt Information </h1>
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
            <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
              Submit Debt
            </Button>
          </div>
        </div>
      );
    }
    
    export default InputDebt;
    
    