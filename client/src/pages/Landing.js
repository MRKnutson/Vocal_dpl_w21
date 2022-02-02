import { VocalButton, VocalHeader } from '../components/Styles.js'
import { Link } from 'react-router-dom';
import macbook from "../images/macbook.png";

const Landing = () => {
  return (
    <>
    <img style={{ height: "32rem", marginTop: "5rem" }} src={macbook} alt="record" /><div id="landingBody">
      <VocalHeader>Your Audio Journal App</VocalHeader>
      <VocalHeader>built by DevPoint Labs </VocalHeader>
      <Link to="/register" id="signUpButton">
        <VocalButton>Sign Up </VocalButton>
      </Link>
    </div>
    </>
  )
}

export default Landing;