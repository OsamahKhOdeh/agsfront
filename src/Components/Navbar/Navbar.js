import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


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
          </div>
        ) : (
          <Button component={Link} to="/" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
