import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Select from "react-select";

const InputIncome = () => {
    const { user } = useContext(UserContext);

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // Some prefilled form state
    const [form, setForm] = useState({
      amount: "",
      period: "",
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
        period: form.period,
        amount: parseInt(form.amount),
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

    const options=[
        {value: "Weekly", label: "Weekly"},
        {value: "Every Other Week", label: "Every Other Week"},
        {value: "Twice a Month", label: "Twice a Month"},
        {value: "Once a Month", label: "Once a Month"},
        {value: "Once a Year", label: "Once a Year"},
    ];

    const [selectedOption, setSelected]= useState("");

    const handleChange= (selectedOption)=> {
        setSelected(selectedOption);
        setForm({ ...form, period: selectedOption.value });
        console.log("Option Selected:", selectedOption);
    }
  
    const onSubmit = async (event) => {
      event.preventDefault();
      const { amount, period } = form;
      if (amount.length === 0 || !period.selected) {
        alert("wrong!");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createDebtQuery, queryVariables, headers);
        alert("Income Added to your database!")
      } catch (error) {
        alert(error)
      }
    };
  
    return(
        <div>
          <Header/>
          <Footer/>
          
          <form onSubmit={onSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
            <h1>Input Expense Information </h1>
            <input
              className="inputBox"
              placeholder="Enter income"
              label="income"
              type="text"
              variant="outlined"
              name="income"
              value={form.income}
              onChange={onFormInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }} 
            />
           <Select options={options} value={form.period} onChange={handleChange} autoFocus={true}></Select>
           <br></br>
            <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
              Submit Debt
            </Button>
          </form>
        </div>
      );
}
    
export default InputIncome;