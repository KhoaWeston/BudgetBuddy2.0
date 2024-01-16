import React from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


// Creates a header with tabs that allow the user to navigate to different windows
const Header=()=>{
    return(
        <header className="nav-header">
            <ul className="row">
                <div style={{ flex: "70%"}}>
                    <li><Link to="/">Home</Link></li>
                    <li className="dropdown-in">
                        <DropdownButton id="input-dropdown" title="Input">
                            <Dropdown.Item> <Link to="/input-expenses">Expenses</Link> </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item><Link to="/input-savings">Savings</Link> </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item> <Link to="/input-income">Income</Link> </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item><Link to="/input-debt">Debts</Link> </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item> <Link to="/input-reminder">Reminders</Link> </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item> <Link to="/input-goal">Goals</Link> </Dropdown.Item>
                        </DropdownButton>
                    </li>
                    <li><Link to="/progress">Progress</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                </div>
                <div style={{ flex: "30%", textAlign:"right", marginRight:"30px", marginTop:"10px"}}><label>Welcome </label><IconButton style={{textAlign:"right"}}><Link to="/profile"><PersonIcon /></Link></IconButton></div>
            </ul>
        </header>
    )
}

export default Header;