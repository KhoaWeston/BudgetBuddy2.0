import React,{useState} from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputIncome=()=>{
    const [income, setIncome]=useState("");
    const [period, setPeriod]=useState("");
    const collectData=()=>{
        console.warn(income, period);
    }

    return(
        <div>
            <Header/>
            <Footer/>
            <form style={{ maxWidth: "500px", margin: "auto" }}>
                <h1>Input income information per payment period</h1>
                <input className="inputBox" type="text" placeholder="Enter income" 
                value={income} onChange={(e)=>setIncome(e.target.value)}
                />
                <select className="inputBox" value={period} onChange={(e)=>setPeriod(e.target.value)}>
                    <option></option>
                    <option>Weekly</option>
                    <option>Every Other Week</option>
                    <option>Twice a Month</option>
                    <option>Once a Month</option>
                    <option>Once a Year</option>
                </select>
                
                <button onClick={collectData} className="appButton" type="button">Enter</button>
            </form>
        </div>
    )
}
export default InputIncome