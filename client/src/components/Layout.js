import React, { useContext } from 'react'
import {Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {VocalNavbar, PrimaryColor, SecondaryColor, ActionColor, VocalButton} from '../components/Styles.js'
import logo from '../images/plain_logo.jpg'
import avatar from '../images/avatar.jpeg'

const Layout = () => {
  const navigate = useNavigate();

  const {authenticated, handleLogout} = useContext(AuthContext);

  const renderUILinks =()=>{
    if(authenticated){
      return(
        <>
          <Nav className="me-auto" onSelect = {handleSelect}>
            <Nav.Link className="navbar-links" eventKey = "/">Record</Nav.Link>
            <Nav.Link className="navbar-links" eventKey = "/activities">Activity</Nav.Link>
            <Nav.Link className="navbar-links" eventKey = "/recordings">Timeline</Nav.Link>
            <Nav.Link className="navbar-links" eventKey = "/mood">Mood</Nav.Link>
            <Nav.Link className="navbar-links" eventKey = "/aboutus">About Us</Nav.Link>
          </Nav>
          <Nav>
           <img src={avatar} alt="User Avatar" style={{height:"40px", borderRadius:"20px"}}/>
            <NavDropdown onSelect = {handleSelect} style={{marginRight:"20px"}} id = "navdropdown-arrow" title = {<span className="navdropdown-title">User</span>}>
              <NavDropdown.Item eventKey = "/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogout(navigate)}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )
    } else {
      return(
        <VocalNavbar expand = "md">
          {/* <Container fluid> */}
            <Nav onSelect = {handleSelect}>
              <Nav.Link style = {{color:"white"}} eventKey = "/login">Log In</Nav.Link>
              <VocalButton><Nav.Link href = "/register">Sign Up</Nav.Link></VocalButton>
            </Nav>
          {/* </Container> */}
        </VocalNavbar>
      )
    };
  };

  const handleSelect = (eventKey) => {
    navigate(eventKey)
  };

  return(
    <>
      <VocalNavbar style={{borderBottom:"1px solid #FFFF"}}expand = "md">
        <Container fluid>
          <VocalNavbar.Brand href="/">
            <img src={logo} alt="Vocal Logo"/>
          </VocalNavbar.Brand>
          <VocalNavbar.Toggle aria-controls="response-navbar-nav" />
          <VocalNavbar.Collapse id="responsive-navbar-nav">
              {renderUILinks()}
          </VocalNavbar.Collapse>
        </Container>
      </VocalNavbar>
      <Outlet/>
    </>
  );
};

export default Layout;