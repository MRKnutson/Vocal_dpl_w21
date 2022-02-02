
import React, {useState} from "react";
import axios from "axios";
import {Form, Modal} from 'react-bootstrap'
import { SecondaryColor, ViewButton } from "../components/Styles";

const UpdateUser = (props) => {
    const {newestUser, id, handleUpdateUser, email:initialEmail, password:initialPassword, toggleForm, nickname:initialNickname} = props

    const [nicknameState, setNicknameState] = useState(initialNickname ? initialNickname : "");
    const [emailState, setEmailState] = useState(initialEmail ? initialEmail: "");
    const [passwordState, setPasswordState] = useState(initialPassword ? initialPassword : "");
git c    const [passwordCheckState, setPasswordCheckState] = useState("");
  
    const handlePasswordChange = async () => {
      let newPass = {password: passwordState, password_confirmation: passwordState};
      console.log(newPass)
      let response = await axios.put(`/api/auth/password`, newPass)
      console.log(response.data)
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      handlePasswordChange();
      const newUser = {nickname: nicknameState, email: emailState, password: passwordState};
    if (id) {
      let response = await axios.put(`/api/users/${id}`, newUser)
      console.log(response.data)
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
      <h1 style={{color:"white", fontWeight:"700"}}>{id ? "Update" : "New"}</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Label style={{color:"white", marginTop:"1rem", fontWeight:"700"}}>Nickname:</Form.Label>
          <Form.Control value = {nicknameState} onChange = {(e) => setNicknameState(e.target.value)}/>
          <Form.Label style={{color:"white", marginTop:"1rem", fontWeight:"700"}}>Email:</Form.Label>
          <Form.Control value = {emailState} onChange = {(e) => setEmailState(e.target.value)}/>
          <Form.Label style={{color:"white"}}>Password:</Form.Label>
          <Form.Control value = {passwordState} onChange = {(e) => setPasswordState(e.target.value)}/>
         <br/>
          <ViewButton style={{marginRight:"1rem"}} type = "submit">{id ? "Update" : "Create"}</ViewButton>
          <ViewButton onClick={toggleForm}>Cancel</ViewButton>
        </Form>
        </Modal.Body>
    </Modal>
    );
  };
  

  export default UpdateUser;