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

const InputIncome = () => {
    const { user } = useContext(UserContext);
    const [selectedperiod, setSelectedperiod]= useState("");  // a small function that sets the variable selectedperiod when called

    // This function will be called whenever the user edits the form.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // sets the form's variables as null to start 
    const [form, setForm] = useState({
      amount: "",
      period: "",
      createdAt: new Date()
    });
  
    // GraphQL query to create an Income
    const createIncomeQuery = gql`
    mutation AddIncome($data: IncomeInsertInput!) {
      insertOneIncome(data: $data) {
        _id
      }
    }
    `;
  
    // All the data that needs to be sent to the GraphQL endpoint
    // to create an expense will be passed through queryVariables.
    const queryVariables = {
      data: {
        period: selectedperiod,
        amount: parseInt(form.amount),
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

  
    const onSubmit = async (event) => {  // the function that will run when submit income is pressed
      event.preventDefault();
      const { amount } = form;
      if (amount.length === 0 || selectedperiod.length ===0) { // error checking that the form values are filled in
        alert("You must enter all fields to submit a income");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createIncomeQuery, queryVariables, headers); // sends the query with the data points to mongodb
        alert("Income Added to your database!") // alerts the user if sucessfull
      } catch (error) {
        alert(error) // alerts the user if query fails
      }
    };
  
    return(
        <div className="app-container">
          <Header/>
          <div className="input-container">
            <div style={{ textAlign:"right" }}><Popup content=<HelpText/> trigger={<HelpCenterIcon color="disabled" />} /></div>
            <h1>Input Income Information </h1>
            <input
              className="inputBox"
              placeholder="Enter Income"
              label="amount"
              type="number"
              variant="outlined"
              name="amount"
              value={form.amount}
              onChange={onFormInputChange}
              fullwidth
              style={{ marginBottom: "1rem" }} 
            />
           <select required className="inputSelect" value={selectedperiod} onChange={e => setSelectedperiod(e.target.value)}>
            <option value="" disable selected hidden>Select a period </option>
            <option value="Weekly"> Weekly</option>
            <option value="Every Other Week"> Every Other Week</option>
            <option value="Twice a Month"> Twice a Month</option>
            <option value="Once a Month"> Once a Month</option>
            <option value="Once a Year"> Once a Year</option>
           </select>
           <br></br>
            <Button variant="contained" color="primary" onClick={onSubmit} type="submit">
              Submit Income
            </Button>
          </div>
          <Footer/>
        </div>
      );
}

const HelpText = () => (
  <div>
      Fill each field to log your after-tax income. This is the amount in 
      your paycheck after taxes and other deductions are taken out.
  </div>
);

// the form that is displayed when input income page is called
export default InputIncome;