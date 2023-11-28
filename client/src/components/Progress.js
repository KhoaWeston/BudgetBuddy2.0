import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";

const Progress=()=>{
    const app = new App(APP_ID);
    const [progress, setProgress] = useState(0);
    const [actualWant, setActualWant] = useState(0);
    const [actualNeed, setActualNeed] = useState(0);
    const [actualSaving, setActualSaving] = useState(0);
    const [currentIncome, setIncome] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);

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
    
    const getGoalAmount = async()=>{
        const goals = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Goals');
        const goal = await goals.findOne();
        setGoalAmount(goal.amount)
    }

    const setProgressBar = ()=>{
        let progressAmount = (actualSaving/goalAmount)*100;
        setProgress(progressAmount);
    }

    // const handlebuttonClick = ()=>{
    //     if (progress < 100){
    //         setProgress(progress + 20);
    //     }
    // }

    // const handlebuttonReset=()=>{
    //     setProgress(0);
    // }

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
        getGoalAmount();
        setProgressBar();
    }, []);

    return(
        <div>
            <Header/>
            <Footer/>
            <form style={{ maxWidth: "400px", margin: "auto" }}><h2>User Income per month: ${currentIncome}</h2></form>
            <div className="row">
                <div className="column">
                    <div>Recommended Spending according to the 50/30/20 Monthly Budget</div>
                </div>
                <div className="column">
                    <div>Actual Monthly Spending</div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div>Needs: ${currentIncome*0.5}</div>
                    <div>Wants: ${currentIncome*0.3}</div>
                    <div>Savings: ${currentIncome*0.2}</div>
                </div>
                <div className="column">
                    <div>Wants: ${actualWant}</div>
                    <div>Needs: ${actualNeed}</div>
                    <div>Savings: ${actualSaving}</div>
                </div>
            </div>
            <div><form style={{ margin: "50px"}}>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
                </div>
                <div className="progress-label">{progress}% towards your goal!</div>
                {/* <button onClick={handlebuttonClick}>Progress</button>
                <button onClick={handlebuttonReset}>Reset</button> */}
                </form>
            </div>
        </div>
    )
}
export default Progress
