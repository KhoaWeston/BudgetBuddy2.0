import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const Progress=()=>{
    const app = new App(APP_ID);
    const [progress, setProgress] = useState(0);
    const [actualWant, setActualWant] = useState("");
    const [actualNeed, setActualNeed] = useState("");
    const [actualSaving, setActualSaving] = useState("");
    const [currentIncome, setIncome] = useState("");

    const calculateWant = async() =>{
        const expenses = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Expenses');
        let expense = await expenses.find();        
        setActualWant(expense.reduce((a,v)=>a=a+v.amount,0));
    }

    const calculateNeed = async() =>{
        const debts = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Debts');
        let debt = await debts.find();        
        setActualNeed(debt.reduce((a,v)=>a=a+v.amount,0));
    }

    const calculateSaving = async() =>{
        const savings = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Savings');
        let saving = await savings.find();        
        setActualSaving(saving.reduce((a,v)=>a=a+v.amount,0));
    }

    const getIncome = async()=>{
        const income = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Income');
        const payment = await income.findOne();
        if (payment.period === "Weekly"){
            setIncome(payment.amount*4.3);
        } else if (payment.period === "Every Other Week"){
            setIncome(payment.amount*2.17);
        } else if (payment.period === "Twice a Month"){
            setIncome(payment.amount/2);
        } else if (payment.period === "Once a Month"){
            setIncome(payment.amount);
        } else if (payment.period === "Once a Year"){
            setIncome(payment.amount/12);
        } else {
            setIncome(0);
        }
        
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

    useEffect(() => {
        getIncome(); 
        calculateWant();
        calculateNeed();
        calculateSaving();
    }, []);

    return(
        <div>
            <Header/>
            <Footer/>
            <h2>User Income per month: ${currentIncome}</h2>
            <div className="row">
                <div className="column">
                    <div><b>Recommended Spending according to the 50/30/20 Monthly Budget </b></div>
                    <div>Needs: ${currentIncome*0.5}</div>
                    <div>Wants: ${currentIncome*0.3}</div>
                    <div>Savings: ${currentIncome*0.2}</div>
                </div>
                <div className="column">
                    <div>Actual Monthly Spending</div>
                    <div>Wants: ${actualWant}</div>
                    <div>Needs: ${actualNeed}</div>
                    <div>Savings: ${actualSaving}</div>
                </div>
            </div>
            
            <div className="container">
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
                </div>
                <div className="progress-label">{progress}</div>
                <button onClick={handlebuttonClick}>Progress</button>
                <button onClick={handlebuttonReset}>Reset</button>
                
            </div>
        </div>
    )
}
export default Progress
