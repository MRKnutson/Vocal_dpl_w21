import React, { useContext, useState } from 'react'
import { Button, Container, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Register = () => {

  const {handleRegister} = useContext(AuthContext);
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({email, password}, navigate)
  };

  return(
    <Container>
    <VocalHeader style={{marginTop:"6rem", marginBottom:"3rem"}}>Sign Up</VocalHeader>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white"}}>Email Address:</Form.Label>
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
        <VocalButton type ="submit">Register</VocalButton>
      </Form>
    </Container>
  )
};

export default Register;