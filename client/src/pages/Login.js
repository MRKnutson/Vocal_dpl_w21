import React, { useContext, useState, useRef } from 'react'
import { Button, Container, Form, Overlay } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import '../StylesFolder/Styles_Login.css';
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'

const Login = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const {handleLogin} = useContext(AuthContext);
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState()
  const navigate = useNavigate();

  const auth = useContext(AuthContext)
  const errors = auth.errors

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
        <Form.Group className="mb-3" controlId="formBasicEmail" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white"}} ref={target}>Email Address:</Form.Label>
          <Form.Control type="email" value = {email} placeholder="Enter Email" onChange = {(e)=>setEmail(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword" onClick={()=> setShow(false)}>
          <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control type="password" value={password} placeholder="Password" onChange= {(e)=>setPassword(e.target.value)}/>
        </Form.Group>
        <VocalButton type ="submit" onClick={()=> setShow(true)}>Login</VocalButton>
      </Form>

      {/* Front end authentication error */}
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
                  {errors && errors}
                </div>
              )}
            </Overlay>
    </Container>
    </div>
  )
};

export default Login;