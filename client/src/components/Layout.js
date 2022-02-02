import React, { useContext } from 'react'
import {Button, Container, Nav, NavDropdown} from 'react-bootstrap'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {VocalNavbar, VocalButton, SmallButton} from '../components/Styles.js'
import VocalFooter from './VocalFooter';
import VOCAL from "../images/VOCAL.jpg";
import avatar from "../images/avatar.jpeg";

const Layout = () => {
  const navigate = useNavigate();

  const {authenticated, handleLogout, image, nickname} = useContext(AuthContext);

  const renderUILinks =()=>{
    if(authenticated){
      return(
        <>
        <Container style={{display:"flex", justifyContent:"center"}}  >
            <Nav onSelect = {handleSelect}>
                    <Nav.Link className="navbar-links" eventKey="/" >Record</Nav.Link>
                    <Nav.Link className="navbar-links" eventKey="/recordings" >Timeline</Nav.Link>
                    <Nav.Link className="navbar-links" eventKey="/activities" >Activity</Nav.Link>
                    <Nav.Link className="navbar-links" eventKey="/mood" >Mood</Nav.Link>
                    <Nav.Link className="navbar-links" eventKey="/aboutus">About Us</Nav.Link>
            </Nav>
          </Container>
          <Nav>
           {image && <img src={image} alt="User Avatar" style={{height:"2.8rem",width:"2.8rem", borderRadius:"1.4rem", border:".13rem solid #FFFF", objectFit:"cover"}}/>}
           {!image && <img src={avatar} alt="User Avatar" style={{height:"2.8rem", width:"2.8rem", borderRadius:"1.4rem", border:".13rem solid #FFFF", objectFit:"cover"}}/>}
          {nickname && <NavDropdown onSelect = {handleSelect} style={{marginRight:"1.5rem"}} id = "navdropdown-arrow" title = {<span className="navdropdown-title">{nickname}</span>}>
              <NavDropdown.Item eventKey = "/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogout(navigate)}>Logout</NavDropdown.Item>
            </NavDropdown>}
            {!nickname && <NavDropdown onSelect = {handleSelect} style={{marginRight:"1.5rem"}} id = "navdropdown-arrow" title = {<span className="navdropdown-title">User</span>}>
              <NavDropdown.Item eventKey = "/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>handleLogout(navigate)}>Logout</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
        </>
      )
    } else {
      return(
            <Container style ={{display: "flex", justifyContent: "right", alignContent:"center"}} onSelect = {handleSelect}>
              <VocalButton style={{backgroundColor:"transparent"}}><Nav.Link style={{color:"white"}} href = "/login">Log In</Nav.Link></VocalButton>
              <SmallButton><Nav.Link style={{color:"white"}} href = "/register">Sign Up</Nav.Link></SmallButton>
            </Container>
      )
    };
  };

  const handleSelect = (eventKey) => {
    navigate(eventKey)
  };

  return(
    <>
      <VocalNavbar className="navbar-dark" style={{borderBottom:".18rem solid #FFFF"}}expand = "md">
        <Container fluid>
          <VocalNavbar.Brand href="/">
            <img style={{height:"4rem"}} src={VOCAL} alt="Vocal Logo"/>
          </VocalNavbar.Brand>
          <VocalNavbar.Toggle aria-controls="response-navbar-nav" />
          <VocalNavbar.Collapse id="responsive-navbar-nav">
              {renderUILinks()}
          </VocalNavbar.Collapse>
        </Container>
      </VocalNavbar>
      <Outlet/>
      <VocalFooter/>
    </>
  );
};

export default Layout;