
import React, {useState} from "react";
import axios from "axios";
import {Form, Modal} from 'react-bootstrap'
import { SecondaryColor, ViewButton } from "../components/Styles";

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
    <Modal backdrop='static' size='lg' keyboard={false} centered={true} show={true}>
        <Modal.Body style={{backgroundColor: `${SecondaryColor}`, color: "white", padding: "2rem", borderRadius: "1.5rem"}}>
      <h1 style={{color:"white"}}>{id ? "Update" : "New"}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Label style={{color:"white"}}>Nickname:</Form.Label>
          <Form.Control value = {nicknameState} onChange = {(e) => setNicknameState(e.target.value)}/>
          <Form.Label style={{color:"white"}}>Email:</Form.Label>
          <Form.Control value = {emailState} onChange = {(e) => setEmailState(e.target.value)}/>
          {/* <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control value = {passwordState} onChange = {(e) => setPasswordState(e.target.value)}/> */}
         <br/>
          <ViewButton style={{marginRight:"1rem"}} type = "submit">{id ? "Update" : "Create"}</ViewButton>
          <ViewButton onClick={toggleForm}>Cancel</ViewButton>
        </Form>
        </Modal.Body>
    </Modal>
    );
  };
  

  export default UpdateUser;