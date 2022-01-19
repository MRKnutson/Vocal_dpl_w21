import React, { useContext, useState } from 'react'
import RenderJson from '../components/RenderJson';
import EntryModal from '../components/EntryModal';
import { AuthContext } from '../providers/AuthProvider';
import Recorder from '../components/Recorder'
import { Link } from 'react-router-dom';
import '../StylesFolder/Styles_Landing.css';
import { VocalButton } from '../components/Styles.js'
 

const Home =  () => {
  const auth = useContext(AuthContext)
  const [show,setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  };

  const handleShow =()=>{
    setShow(true)
  };

  const handleSave = () => {
    setShow(false)
  };

  const landingScreen = () => {
    return (
      <div id="landingBody">
          <h2 id="landingIntro"> Your Audio Journal App built by DevPoint Labs </h2>
          <Link to="/register" id="signUpButton">
            <VocalButton> Sign Up </VocalButton>
          </Link>
      </div>
    )
}

  return(
    <div>
      {!auth.authenticated ? landingScreen() : <Recorder />}
    </div>
  )
};

export default Home;