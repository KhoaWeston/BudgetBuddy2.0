import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const Progress=()=>{
    const app = new App(APP_ID);
    const [progress, setProgress] = useState(0);
    const [SUM, setSUM] = useState("");

    const CalculatedProgress = async() =>{
        const expenses = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Expenses');
        let docnum = await expenses.count();
        let expenseSum = await expenses.findOne();
        let totalexpense = 0;
        for (let i=0; i<docnum; i++){
            totalexpense= totalexpense+ expenseSum.amount;
        }
        setProgress(totalexpense);
    }
    

    const handlebuttonClick = ()=>{
        if (progress < 100){
            setProgress(progress + 20);
        }
    }
    const handlebuttonReset=()=>{
        setProgress(0);
    }
    const getColor=()=>{
        if(progress < 40){
            return "#ff0000";
        } else if (progress < 70){
            return "#ffa500";
        } else {
            return "#2ecc71";
        }
    }
    return(
        <div>
            <Header/>
            <Footer/>
            <div className="container">
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
                </div>
                <div className="progress-label">{progress}</div>
                <button onClick={CalculatedProgress}>Progress</button>
                <button onClick={handlebuttonReset}>Reset</button>
                
            </div>
        </div>
    )
}
export default Progress
