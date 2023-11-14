import React,{useState} from "react";
import Header from '../Header.js';
import Footer from '../Footer.js';

const InputReminder=()=>{
    const [cost, setCost]=useState("");
    const [description, setDescription]=useState("");
    const collectData=()=>{
        console.warn(cost, description);
    }

    return(
        <div>
            <Header/>
            <Footer/>
            <div className="input">
                <h1>Input reminder information</h1>
                <input className="inputBox" type="text" placeholder="Enter Cost" 
                value={cost} onChange={(e)=>setCost(e.target.value)}
                />
                <input className="inputBox" type="text" placeholder="Enter Description" 
                value={description} onChange={(e)=>setDescription(e.target.value)}
                />
                
                <button onClick={collectData} className="appButton" type="button">Enter</button>
            </div>
        </div>
    )
}
export default InputReminder