import React, { useContext } from 'react'
import {Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {VocalNavbar, PrimaryColor, SecondaryColor, ActionColor} from '../components/Styles.js'
import logo from '../images/plain_logo.jpg'

const Layout = () => {
  const navigate = useNavigate();

  const {authenticated, handleLogout} = useContext(AuthContext);

  const renderUILinks =()=>{
    if(authenticated){
      return(
        <NavDropdown style={{color:"white"}} title = "User" id="collapsible-nav-dropdown">
        <NavDropdown.Item eventKey = "/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>handleLogout(navigate)}>Logout</NavDropdown.Item>
        </NavDropdown>
      )
    } else {
      return(
        <>
          <Nav.Link eventKey = "/login">Log In</Nav.Link>
          <Nav.Link eventKey = "/register">Sign Up</Nav.Link>
        </>
      )
    };
  };

  const handleSelect = (eventKey) => {
    navigate(eventKey)
  };

  return(
    <>
      <VocalNavbar expand = "md">
        <Container fluid>
          <VocalNavbar.Brand><img
        src={logo}
        alt="Vocal Logo"
      /></VocalNavbar.Brand>
          <VocalNavbar.Toggle aria-controls="response-navbar-nav" />
          <VocalNavbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" onSelect = {handleSelect}>
              <Nav.Link style={{color:"white"}} eventKey = "/">Record</Nav.Link>
              <Nav.Link style={{color:"white"}} eventKey = "/recordings">Timeline</Nav.Link>
              <Nav.Link style={{color:"white"}} eventKey = "/mood">Mood</Nav.Link>
              <Nav.Link style={{color:"white"}} eventKey = "/activities">Activities</Nav.Link>
              <Nav.Link style={{color:"white"}} eventKey = "/aboutus">About Us</Nav.Link>
            </Nav>
            <Nav className="justify-content-end" onSelect = {handleSelect}>
              {renderUILinks()}
            </Nav>
          </VocalNavbar.Collapse>
        </Container>
      </VocalNavbar>
      <Outlet />
    </>
  );
};

export default Layout;