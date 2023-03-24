import React, { useState } from 'react';
import { EmployeeMenuItems, AdminMenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Dropdown() {
  const [click, setClick] = useState(false);
  const {isAdmin} = useAuth();


  const handleClick = () => setClick(!click);
   let MenuItems = EmployeeMenuItems;
   if(isAdmin){
    MenuItems = AdminMenuItems;
   }
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'} style={{display : "flow-root"}}
      >
        {MenuItems.map((item, index) => {
          console.log(item);
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
