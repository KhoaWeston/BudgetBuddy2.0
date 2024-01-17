import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import khoaImage from '../images/Khoa.jpg';
import chekaImage from '../images/Cheka.jpg';


// Displays home page with summary of project and information about programmers
export default function Home() {
  return (
    <div className="app-container">
      <Header/>
      <h1><form style={{ maxWidth: "500px", margin: "auto", textAlign:"center"}}>Welcome to BudgetBuddy</form></h1>
      <u1><form className="comp-container" style={{ marginLeft: "20px", marginRight: "20px", padding:"15px"}}>Financial stability is an important aspect of life. Many people who struggle to be financially stable don’t have the required education on how to save and budget. Numerous companies have attempted to help these people by developing budgeting applications; however, many are too expensive and complicated for beginners. To improve on those areas, BudgetBuddy focuses on making a beginner-friendly and personalized budgeting application. It accomplishes this by only asking for any debts, savings, and incomes that the user may have and creates a budgeting model for them. The user can personalize this by adding any goals they may have and/or reminders they would like BudgetBuddy to send them.  </form></u1>
      <h2 style={{ marginLeft:"20px"}}>Project Members</h2>
      <div className="row">
        <div className="column" style={{ textAlign:"center", marginBottom: "50px" }}>
          <div className="comp-container" style={{ maxWidth: "500px", margin: "auto", padding: "10px"}}>
            <img style={{height:"150px", borderRadius:"5px"}} src={khoaImage} alt="[insert img]" />
            <div>Khoa Weston</div>
            <div>Major(s): Electrical and Computer Engineering</div>
            <div>Enjoys playing pickleball and weightlifting</div>
          </div>
        </div>
        <div className="column" style={{ textAlign:"center", marginBottom: "50px" }}>
          <div className="comp-container"  style={{ maxWidth: "500px", margin: "auto", padding: "10px"}}>
            <img style={{height:"150px", borderRadius:"5px"}} src={chekaImage} alt="[insert img]" />
            <div>Cheka Queary</div>
            <div>Major(s): Software Engineering</div>
            <div>Spends her time playing volleyball for Trine University</div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
};