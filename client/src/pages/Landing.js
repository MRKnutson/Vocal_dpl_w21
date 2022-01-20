import { VocalButton } from '../components/Styles.js'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div id="landingBody">
    <h2 id="landingIntro"> Your Audio Journal App built by DevPoint Labs </h2>
    <Link to="/register" id="signUpButton">
      <VocalButton> Sign Up </VocalButton>
    </Link>
</div>
  )
}

export default Landing;