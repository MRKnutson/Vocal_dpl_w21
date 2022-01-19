import React, { useContext, useState, useRef } from 'react';
import { Button, Container, Form, Overlay } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Register = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const {handleRegister} = useContext(AuthContext);
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const navigate = useNavigate();
  
  const auth = useContext(AuthContext)
  const errors = auth.errors
  

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({email, password}, navigate)  
  };
  console.log(errors)
  
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white"}} ref={target}>Email Address:</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white"}}>Confirm Password:</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>

        <VocalButton type ="submit" onClick={()=> setShow(true)}>Register</VocalButton>
        
          <Overlay target={target.current} show={show} placement="right">
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
              {errors}
            </div>
          )}
        </Overlay>
      
      </Form>
    </Container>
  )
};

export default Register;