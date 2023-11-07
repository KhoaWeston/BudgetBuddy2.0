import React,{useState} from "react";

const InputSavings=()=>{
    const [cost, setCost]=useState("");
    const [description, setDescription]=useState("");
    const collectData=()=>{
        console.warn(cost, description);
    }

    return(
        <div className="input">
            <h1>Input savings information</h1>
            <input className="inputBox" type="text" placeholder="Enter Cost" 
            value={cost} onChange={(e)=>setCost(e.target.value)}
            />
            <input className="inputBox" type="text" placeholder="Enter Description" 
            value={description} onChange={(e)=>setDescription(e.target.value)}
            />
            
            <button onClick={collectData} className="appButton" type="button">Enter</button>
        </div>
    )
}
export default InputSavings