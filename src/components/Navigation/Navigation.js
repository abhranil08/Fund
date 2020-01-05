import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import classes from './Navigation.module.css';

const Navigation = props => {
  return (
    <Navbar className={classes.Navbar} bg="light" variant="light" expand="lg" sticky="top">
      <Navbar.Brand><Link className={classes.NavBrand} to="/"><span>FundTax Guru</span></Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link className={classes.NavLink} to="/login"><span>Login</span></Link>
          <Link className={classes.NavLink} to="/signup"><span>Sign Up</span></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;