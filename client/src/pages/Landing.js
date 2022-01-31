import { VocalButton, VocalHeader } from '../components/Styles.js'
import { Link } from 'react-router-dom';
import landing from "../images/landing.png";

const Landing = () => {
  return (
    <div id="landingBody">
    <VocalHeader>Your Audio Journal App</VocalHeader>
    <VocalHeader>built by DevPoint Labs </VocalHeader>
    <Link to="/register" id="signUpButton">
      <VocalButton>Sign Up </VocalButton>
    </Link>
    <img style={{height:"60rem", marginTop:"5rem"}}src={landing} alt="record"/>
</div>
  )
}

export default Landing;