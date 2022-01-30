import React from "react";
import { Container, Nav } from "react-bootstrap";
import { VocalNavbar } from "./Styles";
import footer from "../images/footer.png"
import { useNavigate } from 'react-router-dom';



const VocalFooter = () => {

    const navigate = useNavigate();
    const handleSelect = (eventKey) => {
        navigate(eventKey)
      };

    return (
        <VocalNavbar style={{borderTop:".18rem solid #FFFF"}} fixed = "bottom">
            <Container fluid>
                <VocalNavbar.Brand href="/">
                <img style={{height:"4rem", border:".18rem solid #FFFF"}} src={footer} alt="Vocal Logo"/>
                </VocalNavbar.Brand>
            <h1 style={{color:"#dedede", fontSize:"1.3rem", marginRight:"45rem"}}>© 2022 DevPoint Labs LLC</h1>
            <Nav onSelect = {handleSelect}>
                <Nav.Link style={{marginRight:"4rem", fontWeight:"700"}} className="navbar-links" eventKey="/aboutus">About Us</Nav.Link>
            </Nav>
            </Container>
        </VocalNavbar>
    )
}

export default VocalFooter;