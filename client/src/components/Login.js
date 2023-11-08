import React,{useState} from "react";

export const Login= (props)=> {
    
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }
    
    return (
        <div>
            <h2>Login to BudgetBuddy</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input value={username} onChange={(e) => setUserName(e.target.value)}type="Username" placeholder="username" id="username" name="username" />
                <br></br>
                <label>Password:  </label>
                <input value={password} onChange={(e) => setPassWord(e.target.value)} type="Password" placeholder="********" id="password" name="password" />
                <br></br>
                <button type="submit">Log In</button>
            </form>
            <button onClick={() => props.onFormSwitch('Register')}>Don't have an account? Register here.</button>
        </div>
    )
}
export default Login

