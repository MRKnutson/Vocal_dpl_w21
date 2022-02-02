import React, { useContext, useState, useRef } from 'react';
import { Button, Container, Form, Overlay } from 'react-bootstrap';
import { NavigationType, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const {handleRegister} = useContext(AuthContext);
  const [nickname, setNickname] = useState(null)
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const [passwordConfirmation, setPasswordConfirmation]=useState(null);
  const [passError, setPassError] = useState([])
  
  const auth = useContext(AuthContext)
  const errors = auth.errors
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == passwordConfirmation){
      handleRegister({email, password, nickname}, navigate)  
    } else {
      setPassError(['--Passwords do not match, please try again'])
      // setPasswordConfirmation(null);
    }
  };
  
  return (
    <Container>
      <VocalHeader style={{marginTop:"5rem", marginBottom:"2rem", marginLeft:"3rem"}}>Sign Up</VocalHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white", fontWeight:"700"}} ref={target}>Nickname:</Form.Label>
          <Form.Control style={{marginLeft:".5rem"}} maxLength={20} placeholder="Enter Nickname" onChange = {(e)=>setNickname(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white", fontWeight:"700"}} ref={target}>Email Address:</Form.Label>
          <Form.Control style={{marginLeft:".5rem"}} type="email" placeholder="Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white", fontWeight:"700"}}>Password:</Form.Label>
          <Form.Control style={{marginLeft:".5rem"}} type="password" placeholder="Enter Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword" onClick={()=>(setShow(false) & setPassError(null))}>
          <Form.Label style={{color:"white", fontWeight:"700"}}>Confirm Password:</Form.Label>
          <Form.Control style={{marginLeft:".5rem"}} type="password" placeholder="Confirm Password" onChange= {(e)=>setPasswordConfirmation(e.target.value)}/>
        </Form.Group>
        <div style={{display:"flex", justifyContent:"center", marginTop:"2rem"}}>
        <VocalButton style={{width:"7rem"}} type ="submit" onClick={()=> setShow(true)}>Register</VocalButton>
        </div>
      {/* Backend / Frontend authentication error */}
          <Overlay target={target.current} show={show} placement="bottom">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(255, 100, 100, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              {errors && errors}
              {passError && passError}
            </div>
          )}
        </Overlay>

      
      </Form>
    </Container>
  )
};

export default Register;