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
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const [passwordConfirmation, setPasswordConfirmation]=useState(null);
  const [passError, setPassError] = useState([])
  
  const auth = useContext(AuthContext)
  const errors = auth.errors
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == passwordConfirmation){
      handleRegister({email, password}, navigate)  
    } else {
      setPassError(['--Passwords do not match, please try again'])
      // setPasswordConfirmation(null);
    }
  };
  
  return (
    <Container>
      <VocalHeader style={{marginTop:"5rem", marginBottom:"2rem", marginLeft:"4rem"}}>Sign Up</VocalHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white"}} ref={target}>Email Address:</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword" onClick={()=>(setShow(false) & setPassError(null))}>
          <Form.Label style={{color:"white"}}>Confirm Password:</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange= {(e)=>setPasswordConfirmation(e.target.value)}/>
        </Form.Group>

        <VocalButton type ="submit" onClick={()=> setShow(true)}>Register</VocalButton>
      
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