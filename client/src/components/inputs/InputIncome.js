import { useContext, useState } from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";
import { Button } from '@mui/material';
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputIncome = () => {
    const { user } = useContext(UserContext);
    const [selectedperiod, setSelectedperiod]= useState("");

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

  
    const onSubmit = async (event) => {
      event.preventDefault();
      const { amount } = form;
      if (amount.length === 0 || selectedperiod.valueOf ==="") {
        alert("wrong!");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createIncomeQuery, queryVariables, headers);
        alert("Income Added to your database!")
      } catch (error) {
        alert(error)
      }
    };
  
    return(
        <div>
          <Header/>
          <Footer/>
          
          <div className="input-container">
            <h1>Input Income Information </h1>
            <input
              className="inputBox"
              placeholder="Enter income"
              label="amount"
              type="text"
              variant="outlined"
              name="amount"
              value={form.amount}
              onChange={onFormInputChange}
              fullWidth
              style={{ marginBottom: "1rem" }} 
            />
           <select style={{width:"415px", height:"30px", marginBottom:"20px"}} value={selectedperiod} onChange={e => setSelectedperiod(e.target.value)}>
            <option value=" ">  </option>
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
        </div>
      );
}
    
export default InputIncome;