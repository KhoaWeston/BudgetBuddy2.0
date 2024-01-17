import React, { useState, useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import "./Progress.css";
import { Button } from '@mui/material'
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal/index';


const Progress=()=>{
    const app = new App(APP_ID); // Creating a Realm App Instance
    const [goalCat, setGoalCat] = useState("");
    const [currentGoalProgress, setCurrentGoalProgress] = useState(0);
    const [actualWant, setActualWant] = useState(0);
    const [actualNeed, setActualNeed] = useState(0);
    const [actualSaving, setActualSaving] = useState(0);
    const [currentIncome, setIncome] = useState(0);
    const [goalAmount, setGoalAmount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const today = new Date();
    const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    let ctr_goal = 0;
    let ctr_income = 0;
    
    const close = () => setModalOpen(false);
    const open = () => setModalOpen(true);


    // Sums all the user's expenses in the database
    const calculateWant = async() =>{
        const expenses = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Expenses');
        const expense = await expenses.find();        
        let total = 0;
        for (let i = 0; i < expense.length; i++) {
            if(expense[i].createdAt > oneMonthAgo){
                total = total + expense[i].amount;
            }
        }
        setActualWant(total.toFixed(2));
    }

    // Sums all the user's debts in the database
    const calculateNeed = async() =>{
        const debts = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Debts');
        const debt = await debts.find();        
        let total = 0;
        for (let i = 0; i < debt.length; i++) {
            if(debt[i].createdAt > oneMonthAgo){
                total = total + debt[i].amount;
            }
        }
        setActualNeed(total.toFixed(2));
    }

    // Sums the user's savings from all categories
    // Also sums the user's savings from category matching the user's goal
    const calculateSaving = async() =>{
        const savings = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Savings');
        const saving = await savings.find();        
        
        let total = 0;
        let specificTotal = 0;
        for (let i = 0; i < saving.length; i++) {
            if(saving[i].category === goalCat){
                specificTotal = specificTotal + saving[i].amount;
            }
            if(saving[i].createdAt > oneMonthAgo){
                total = total + saving[i].amount;
            }
        }
        setActualSaving(total.toFixed(2));
        setCurrentGoalProgress(specificTotal.toFixed(2));
    }

    // Calculates the user's income in amount per month
    const getIncome = async()=>{
        const income = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Income');
        try{
            const payment = await income.findOne();
            if (payment.period === "Weekly"){
                setIncome((payment.amount*4.3).toFixed(2));
            } else if (payment.period === "Every Other Week"){
                setIncome((payment.amount*2.17).toFixed(2));
            } else if (payment.period === "Twice a Month"){
                setIncome((payment.amount/2).toFixed(2));
            } else if (payment.period === "Once a Month"){
                setIncome((payment.amount).toFixed(2));
            } else if (payment.period === "Once a Year"){
                setIncome((payment.amount/12).toFixed(2));
            } else {
                setIncome(0);
            } 
        }catch(error){
            if(ctr_income < 1){
                alert("No income is currently entered... therefore your progress will not be correct");
                ctr_income++;
            }
        }    
    }
    
    // Stores the user's goal amount and what category
    const getGoalAmount = async()=>{
        const goals = app.currentUser.mongoClient('mongodb-atlas').db('BudgetBuddyDB').collection('Goals');
        try{
            const goal = await goals.findOne();
            setGoalAmount((goal.amount).toFixed(2));
            setGoalCat(goal.category);
        }catch(error){
            if(ctr_goal < 1){
                alert("No goal is currently entered... therefore your progress will not be correct");
                ctr_goal++;
            }
        }
    }

    const progress_num = (currentGoalProgress / goalAmount *100);
    // Changes the color of the progress bar depending on percentage
    const getColor=()=>{
        if(progress_num < 40){
            return "#ff0000";
        } else if (progress_num < 70){
            return "#ffa500";
        } else {
            return "#2ecc71";
        }
    }

    useEffect(() => {
        getGoalAmount();
        getIncome(); 
        calculateWant();
        calculateNeed();
        calculateSaving();
    });
    
    return(
        <div className="app-container">
            <Header/>
            <form style={{ maxWidth: "500px", marginLeft: "auto", marginRight:"auto", textAlign:"center"}}><h1 style={{marginBottom:"0px"}}>User Progress</h1></form>
            <div className="comp-container" style={{margin:"20px"}}>
                <h2 style={{marginLeft:"20px", marginTop:"0px", marginBottom:"5px"}}>User Income per Month: ${currentIncome}</h2>
                <div className="row">
                    <div className="column">
                        <h3>Recommended Spending According to the 50/30/20 Monthly Budget:</h3>
                    </div>
                    <div className="column">
                        <h3>This Month's Spending:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div>Needs: ${(currentIncome*0.5).toFixed(2)}</div>
                        <div>Wants: ${(currentIncome*0.3).toFixed(2)}</div>
                        <div>Savings: ${(currentIncome*0.2).toFixed(2)}</div>
                    </div>
                    <div className="column">
                        <div>Wants: ${actualWant}</div>
                        <div>Needs: ${actualNeed}</div>
                        <div>Savings: ${actualSaving}</div>
                    </div>
                </div>
            </div>
            <div><form className="comp-container" style={{ margin: "20px", padding: "10px", textAlign:"center"}}>
                <h2 style={{marginLeft:"20px", marginTop:"0px", marginBottom:"5px"}}>Goal Progress Bar:</h2>
                <div className="progress-label">Your goal is to have ${goalAmount} in your {goalCat}. You currently have ${currentGoalProgress}.</div>
                <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ maxWidth: "100%", width: `${progress_num}%`, backgroundColor: getColor() }}></div>
                </div>
                <div className="progress-label">{progress_num.toFixed(0)}% towards your goal!</div>
                <Button variant="contained" href="/input-goal">Change Goal</Button>
                <Button
    
                    onClick={() => (modalOpen ? close() : open())}
                >
                    Popup
                </Button>
                
                {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}

                </form>
            </div>
            <Footer/>
        </div>
    )
}
export default Progress
