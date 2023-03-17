import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import useStyles from './styles';

const Navbar = () => {
 
  const classes = useStyles();

  
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src='/images/logo.png' alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
