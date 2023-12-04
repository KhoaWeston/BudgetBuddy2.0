import { UserProvider } from "./contexts/user.context";
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoute from "./components/PrivateRoute.js";
import Login  from "./components/Login.js";
import Signup from "./components/Register.js";
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
import ResetPass from './components/ResetPass.js';
import ConfirmUser from './components/confirmUser.js';

function App() {
  return (
    <BrowserRouter>
      {/* We are wrapping our whole app with UserProvider so that */}
      {/* our user is accessible through out the app from any page*/}
      <UserProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/confirmUser" element={<ConfirmUser/>}/>
          <Route path="/resetPassword" element={<ResetPass/>} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
             <Route path="/" element={<Home />} />
             <Route path="/input-expenses" element={<InputExpenses />} />
             <Route path="/input-savings" element={<InputSavings />} />
             <Route path="/input-income" element={<InputIncome />} />
             <Route path="/input-debt" element={<InputDebt />} />
             <Route path="/input-reminder" element={<InputReminder />} />
             <Route path="/input-goal" element={<InputGoal />} />
             <Route path="/progress" element={<Progress />} />
             <Route path="/analytics" element={<Analytics />} />
             <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
  
export default App;
