import React, {useState, useEffect, useRef} from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
//import Dropdown from 'react-bootstrap/Dropdown';
//import DropdownButton from 'react-bootstrap/DropdownButton';



const Header=()=>{
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    
    useEffect(() => {
        let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
            setOpen(false);
            console.log(menuRef.current);
        }      
        };
        document.addEventListener("mousedown", handler);
        return() =>{
        document.removeEventListener("mousedown", handler);
        }
    });

    return(
        <header className="nav-header">
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <div className='menu-container' ref={menuRef}>
                        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
                            <l1>Input</l1>
                        </div>

                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                            <ul>
                                <DropdownItem text = {"Expenses"}><Link to="/input-expenses"/></DropdownItem>
                                <DropdownItem text = {"Edit Profile"}/>
                                <DropdownItem text = {"Inbox"}/>
                                <DropdownItem text = {"Settings"}/>
                                <DropdownItem text = {"Helps"}/>
                                <DropdownItem text = {"Logout"}/>
                            </ul>
                        </div>
                    </div>
                    {/* <li className="dropdown-in">
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
                    </li> */}
                    <li><Link to="/progress">Progress</Link>
                    </li>
                    <li><Link to="/analytics">Analytics</Link></li>
                    <IconButton><Link to="/profile"><PersonIcon /></Link></IconButton>
                </ul>
            </div>
        </header>
    )
}

function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <a> {props.text} </a>
      </li>
    );
  }

export default Header;