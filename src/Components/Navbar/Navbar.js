import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';

function Navbar() {
  
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
      <Link to='/user' className='nav-links' onClick={closeMobileMenu} >
                <img className="logo_image" src='/images/logo_nav.png' alt="icon" height="40px" />
      </Link>
  
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/user' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/user/makepi'
              className='nav-links'
              onClick={closeMobileMenu}
            >
             Options <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>
          <li className='nav-item'>
            <Link
              to='/products'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li>
          <li className='nav-item'>
            <Link
              to='/contact-us'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to='/sign-up'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;


/*
import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './styles.css'


import useStyles from './styles';
import useAuth from '../../hooks/useAuth';
import { logOut } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {username , status} = useAuth();
  const [user, setUser] = useState(useAuth()?.username);  


  const logout = () => {
    dispatch(logOut());

    navigate('/');

    setUser(null);
  };

 
  const classes = useStyles();

  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/user" className={classes.brandContainer}>
        <img className={classes.image} src='/images/logo_nav.png' alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user}>{user.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user}</Typography>
            <Typography color='primary'  className={classes.userName} variant="h6">{status}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            <div class="dropdown">
               <button class="dropbtn">Dropdown 
                 <i class="fa fa-caret-down"></i>
               </button>
                <div class="dropdown-content">
                   <a href="#">Link 1</a>
                   <a href="#">Link 2</a>
                   <a href="#">Link 3</a>
                 </div>
                </div> 
          </div>
        ) : (
          <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;



*/