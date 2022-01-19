import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import '../StylesFolder/Styles_Login.css';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Login = () => {
  const {handleLogin} = useContext(AuthContext);
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState()
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({email, password}, navigate)
  };

  return(
    <div>
    <VocalHeader style={{marginTop:"5rem", marginBottom:"2rem", marginLeft:"5rem"}}> 
      Log In
    </VocalHeader>
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{color:"white"}}>Email Address</Form.Label>
          <Form.Control type="email" value = {email} placeholder="Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{color:"white"}}>Password</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <VocalButton type ="submit">Login</VocalButton>
      </Form>
    </Container>
    </div>
  )
};

export default Login;