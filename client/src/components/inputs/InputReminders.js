import React from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';
import { useContext, useState} from "react";
import { UserContext } from "../../contexts/user.context";
import { gql, request } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../../contexts/realm/constants";


const InputReminder=()=>{
    const { user } = useContext(UserContext);
    const [selectedperiod, setSelectedperiod]= useState("");

    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
      };
  
    // Some prefilled form state
    const [form, setForm] = useState({
      description: "",
      period: "",
      createdAt: new Date()
    });
  
    // GraphQL query to create an Income
    const createReminderQuery = gql`
    mutation AddReminder($data: ReminderInsertInput!) {
      insertOneReminder(data: $data) {
        _id
      }
    }
    `;
  
    // All the data that needs to be sent to the GraphQL endpoint
    // to create an expense will be passed through queryVariables.
    const queryVariables = {
      data: {
        period: selectedperiod,
        description: form.description,
        author: user.id,
        createdAt: form.createdAt
      }
    };
  
    // To prove that the identity of the user, we are attaching
    // an Authorization Header with the request
    const headers = { Authorization: `Bearer ${user._accessToken}` };

  
    const onSubmit = async (event) => {
      event.preventDefault();
      if (form.description.length === 0 || selectedperiod.valueOf ==="") {
        alert("wrong!");
        return;
      }
      try {
        await request(GRAPHQL_ENDPOINT, createReminderQuery, queryVariables, headers);
        alert("Reminder Added to your database!")
      } catch (error) {
        alert(error)
      }
    };
    return(
        <div>
            <Header/>
            <Footer/>
            <form style={{ maxWidth: "500px", margin: "auto" }}>
                <h1>Input reminder information</h1>
                <input
                    className="inputBox"
                    placeholder="Enter Description "
                    type="text"
                    variant="outlined"
                    name="description"
                    value={form.description}
                    onChange={onFormInputChange}
                    fullWidth
                    style={{ marginBottom: "1rem" }} 
                />
                <select value={selectedperiod} onChange={e => setSelectedperiod(e.target.value)}>
                    <option value=" ">  </option>
                    <option value="Once a day"> Weekly</option>
                    <option value="Every Other day"> Every Other Day</option>
                    <option value="Once a Month"> Once a Month</option>
                    <option value="Once a Year"> Once a Year</option>
                </select> 
                <br></br>
                <button onClick={onSubmit} className="appButton" type="button">Enter</button>
            </form>
        </div>
    )
}
export default InputReminder