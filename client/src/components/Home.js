import React from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
 
export default function Home() {
  return (
    <>
      <Header/>
      <Footer/>
      <h1><form style={{ maxWidth: "500px", margin: "auto" }}>Welcome to BudgetBuddy</form></h1>
      <ul>This is the description of our project</ul>
    </>
  )
};