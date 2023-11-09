import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from "./components/Login.js";
import Register  from "./components/Register.js";
import Home from './components/Home.js';
import InputExpenses from './components/inputs/InputExpenses.js';
import InputSavings from './components/inputs/InputSavings.js';
import InputIncome from './components/inputs/InputIncome.js';
import InputDebt from './components/inputs/InputDept.js';
import InputReminder from './components/inputs/InputReminders.js';
import InputGoal from './components/inputs/InputGoal.js';
import Analytics from './components/Analytics.js';
import Progress from './components/Progress.js';
import Profile from './components/Profile.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        
        <Header />
        <Footer />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/input-expenses" element={<InputExpenses />} />
          <Route path="/input-savings" element={<InputSavings />} />
          <Route path="/input-income" element={<InputIncome />} />
          <Route path="/input-debt" element={<InputDebt />} />
          <Route path="/input-reminder" element={<InputReminder />} />
          <Route path="/input-goal" element={<InputGoal />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      
      {}
    </div>
  );
}

// function DropdownItem(props){
//   return(
//     <li className = 'dropdownItem'>
//       <a> {props.text} </a>
//     </li>
//   );
// }

export default App;
