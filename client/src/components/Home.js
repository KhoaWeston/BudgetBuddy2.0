import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
 
export default function Home() {
  return (
    <>
      <Header/>
      <Footer/>
      <h1><form style={{ maxWidth: "400px", margin: "auto" }}>Welcome to BudgetBuddy</form></h1>
      <u1><form style={{ margin: "20px"}}>Financial stability is an important aspect of life. Many people who struggle to be financially stable don’t have the required education on how to save and budget. Numerous companies have tried to help these people by making budgeting applications, however, many are too expensive and complicated for these beginners. Therefore, BudgetBuddy focuses on making a beginner friendly personalized budgeting application. It accomplishes this by only asking for any debts, savings, incomes that the user may have and creates a budgeting plan for them. The user can personalize this by adding any goals they may have, or reminders they would like BudgetBuddy to send them.  </form></u1>
    </>
  )
};