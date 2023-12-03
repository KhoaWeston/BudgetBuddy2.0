import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputSavings = () => {
  const { user } = useContext(UserContext);
  const [selectedsavings, setsavings]= useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();
    const {amount } = form;
    if (selectedsavings.valueOf ==="" || amount.length === 0) {
      return;
    }
    try {
      await request(GRAPHQL_ENDPOINT, createSavingsQuery, queryVariables, headers);
      alert("Savings Added to your database!")
    } catch (error) {
      alert(error)
    }
  };
  
  return(
    <div>
      <Header/>
      <Footer/>
      <div className="input-container">
        <h1>Input Savings Information </h1>
        <select style={{width:"415px", height:"30px"}} value={selectedsavings} onChange={e => setsavings(e.target.value)}>
          <option value="">  </option>
          <option value="Emergencies"> Emergencies</option>
          <option value="Retirement">Retirement</option>
          <option value="Vacation"> Vacation</option>
          <option value="Other"> Other</option>
        </select>
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
          Submit Savings
        </Button>
      </div>
    </div>
  );
}
  
  export default InputSavings;
    
    