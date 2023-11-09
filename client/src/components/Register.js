import React, { useState } from "react";

export const Register =(props) =>{
    const [password, setPassWord]= useState('');
    const [username, setUserName] = useState('');

    const handleSubmit=(e) => {
        e.preventDefault();
        console.log(username);
    }

    return (
        <div>
            <h2> Register for a BudgetBuddy Account</h2>
            <form >
                <label>Username: </label>
                <input value={username} onChange={(e) => setUserName(e.target.value)}type="Username" placeholder="username" id="username" name="username" />
                <br></br>
                <label>Password:  </label>
                <input value={password} onChange={(e) => setPassWord(e.target.value)} type="assword" placeholder="********" id="password" name="password" />
                <br></br>
                <button type="submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}

