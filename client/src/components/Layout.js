import React, { useContext } from 'react'
import {Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {VocalNavbar, PrimaryColor, SecondaryColor, ActionColor, VocalButton} from '../components/Styles.js'
import avatar from '../images/avatar.jpeg'
import logofive from '../images/logo5edited.png'

const Layout = () => {
  const navigate = useNavigate();

  const {authenticated, handleLogout} = useContext(AuthContext);

  const renderUILinks =()=>{
    if(authenticated){
      return(
        <>
        <Container style={{display:"flex", justifyContent:"center"}}  onSelect = {handleSelect}>
            <Nav.Link className="navbar-links" href = "/">Record</Nav.Link>
            <Nav.Link className="navbar-links" href = "/activities">Activity</Nav.Link>
            <Nav.Link className="navbar-links" href = "/recordings">Timeline</Nav.Link>
            <Nav.Link className="navbar-links" href = "/mood">Mood</Nav.Link>
            <Nav.Link className="navbar-links" href = "/aboutus">About Us</Nav.Link>
          </Container>
          <Nav>
           <img src={avatar} alt="User Avatar" style={{height:"40px", borderRadius:"20px"}}/>
            <NavDropdown onSelect = {handleSelect} style={{marginRight:"1.5rem"}} id = "navdropdown-arrow" title = {<span className="navdropdown-title">User</span>}>
              <NavDropdown.Item eventKey = "/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogout(navigate)}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </>
      )
    } else {
      return(
            <Container style ={{display: "flex", justifyContent: "right"}} onSelect = {handleSelect}>
              <VocalButton style={{backgroundColor:"transparent"}}><Nav.Link style={{color:"white"}} href = "/login">Log In</Nav.Link></VocalButton>
              <VocalButton><Nav.Link style={{color:"white"}} href = "/register">Sign Up</Nav.Link></VocalButton>
            </Container>
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
            <img style={{height:"4rem", padding:".2rem", marginLeft:".5rem"}} src={logofive} alt="Vocal Logo"/>
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