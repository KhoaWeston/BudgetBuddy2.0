import React from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Header=()=>{
    return(
        <header className="nav-header">
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li className="dropdown-in">
                        <DropdownButton id="input-dropdown" title="Input">
                            <Dropdown.Item href="/input-expenses">Expenses</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/input-savings">Savings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/input-income">Income</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/input-debt">Debts</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/input-reminder">Reminders</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/input-goal">Goals</Dropdown.Item>
                        </DropdownButton>
                    </li>
                    <li><Link to="/progress">Progress</Link></li>
                    <li><Link to="/analytics">Analytics</Link></li>
                    <IconButton><Link to="/profile"><PersonIcon /></Link></IconButton>
                </ul>
            </div>
        </header>
    )
}

export default Header;