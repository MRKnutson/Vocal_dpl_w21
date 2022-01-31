
import React, {useState} from "react";
import axios from "axios";
import {Form, Modal} from 'react-bootstrap'
import { SecondaryColor, VocalButton } from "../components/Styles";

const UpdateUser = (props) => {
    const {newestUser, id, handleUpdateUser, email:initialEmail, password:initialPassword, toggleForm, nickname:initialNickname} = props

    const [nicknameState, setNicknameState] = useState(initialNickname ? initialNickname : "");
    const [emailState, setEmailState] = useState(initialEmail ? initialEmail: "");
    const [passwordState, setPasswordState] = useState(initialPassword ? initialPassword : "");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newUser = {nickname: nicknameState, email: emailState, password: passwordState};
    if (id) {
      let response = await axios.put(`/api/users/${id}`, newUser)
      handleUpdateUser(response.data)
      toggleForm()
    }
    else {
    let response = await axios.post("/api/auth", newUser);
    newestUser(response.data.data)
      }
    };
  
    return (
    <Modal backdrop='static' size='lg' keyboard={false} show={true} style={{backgroundColor:`${SecondaryColor}`, borderRadius:"1.5rem"}}>
      <h1 style={{color:"white"}}>{id ? "Update" : "New"}</h1>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label style={{color:"white"}}>Nickname:</Form.Label>
          <Form.Control value = {nicknameState} onChange = {(e) => setNicknameState(e.target.value)}/>
          <Form.Label style={{color:"white"}}>Email:</Form.Label>
          <Form.Control value = {emailState} onChange = {(e) => setEmailState(e.target.value)}/>
          <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control value = {passwordState} onChange = {(e) => setPasswordState(e.target.value)}/>
         <br/>
          <VocalButton type = "submit">{id ? "Update" : "Create"}</VocalButton>
          <VocalButton onClick={toggleForm}>Cancel</VocalButton>
        </Form>
        </Modal.Body>
    </Modal>
    );
  };
  

  export default UpdateUser;