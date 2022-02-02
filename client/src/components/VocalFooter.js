import React, {useContext} from "react";
import { Container, Nav } from "react-bootstrap";
import { VocalNavbar } from "./Styles";
import footer from "../images/footer.png"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";



const VocalFooter = () => {

    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        navigate(eventKey)
    };
    const {authenticated} = useContext(AuthContext);
    
    if(authenticated){
    return (
        <VocalNavbar style={{borderTop:".18rem solid #FFFF"}} fixed = "bottom">
            <Container fluid>
                <VocalNavbar.Brand style={{display:"flex", flexWrap:"nowrap", alignItems:"center"}}>
                <img style={{height:"4rem", border:".18rem solid #FFFF"}} src={footer} alt="Vocal Logo"/>
                <h1 style={{color:"#dedede", fontSize:"1.3rem", marginLeft:"2rem"}}>© 2022 DevPoint Labs LLC</h1>
                </VocalNavbar.Brand>
            <Nav onSelect = {handleSelect}>
                <Nav.Link style={{marginRight:"4rem", fontWeight:"700", float:"left"}} className="navbar-links" eventKey="/howto">Getting Started</Nav.Link>
                <Nav.Link style={{marginRight:"4rem", fontWeight:"700"}} className="navbar-links" eventKey="/aboutus">About Us</Nav.Link>
            </Nav>
            </Container>
        </VocalNavbar>
    )
}
    return(
        <VocalNavbar style={{borderTop:".18rem solid #FFFF"}} fixed = "bottom">
        <Container fluid>
            <VocalNavbar.Brand style={{display:"flex", flexWrap:"nowrap", alignItems:"center"}}>
            <img style={{height:"4rem", border:".18rem solid #FFFF"}} src={footer} alt="Vocal Logo"/>
            <h1 style={{color:"#dedede", fontSize:"1.3rem", marginLeft:"2rem"}}>© 2022 DevPoint Labs LLC</h1>
            </VocalNavbar.Brand>
        <Nav onSelect = {handleSelect}>
            {/* <Nav.Link style={{marginRight:"4rem", fontWeight:"700", float:"left"}} className="navbar-links" eventKey="/howto">Getting Started</Nav.Link> */}
            <Nav.Link style={{marginRight:"4rem", fontWeight:"700"}} className="navbar-links" eventKey="/aboutus">About Us</Nav.Link>
        </Nav>
        </Container>
    </VocalNavbar>
    )
    };
export default VocalFooter;