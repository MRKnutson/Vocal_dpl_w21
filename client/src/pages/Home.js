import React, { useContext, useState } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';
import Recorder from '../components/Recorder'
import EntryModal from '../components/EntryModal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../StylesFolder/Styles_Landing.css';


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
            <Button> Sign Up </Button>
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