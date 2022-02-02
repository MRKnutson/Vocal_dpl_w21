import { VocalButton, VocalHeader } from '../components/Styles.js'
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import macbook2 from "../images/macbook2.png";

const Landing = () => {
  return (
    <div className="landing-div">
        <img className="landing-image" src={macbook2} alt="record"/>
        <Link to="/register" id="signUpButton">
          <VocalButton className="landing-button">Sign Up </VocalButton>
        </Link>
    </div>
  )
}

export default Landing;