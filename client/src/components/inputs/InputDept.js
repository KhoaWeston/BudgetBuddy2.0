import React,{useState} from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputDebt=()=>{
    const [cost, setCost]=useState("");
    const [description, setDescription]=useState("");
    const collectData=()=>{
        console.warn(cost, description);
    }

    return(
        <div>
            <Header/>
            <Footer/>
            <form style={{ maxWidth: "500px", margin: "auto" }}>
                <h1>Input Debt information</h1>
                <input className="inputBox" type="text" placeholder="Enter Cost" 
                value={cost} onChange={(e)=>setCost(e.target.value)}
                />
                <input className="inputBox" type="text" placeholder="Enter Description" 
                value={description} onChange={(e)=>setDescription(e.target.value)}
                />
                
                <button onClick={collectData} className="appButton" type="button">Enter</button>
            </form>
        </div>
    )
}
export default InputDebt