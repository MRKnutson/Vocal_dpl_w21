import React, {useState} from "react";
import axios from "axios";
import {Form} from 'react-bootstrap'
import { SecondaryColor, VocalButton } from "../components/Styles";

const UserForm = (props) => {

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
  <div style={{backgroundColor:`${SecondaryColor}`, padding:"1rem", borderRadius:"1.5rem"}}>
    <h1 style={{color:"white"}}>{id ? "Update" : "New"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Label style={{color:"white"}}>Nickname:</Form.Label>
        <Form.Control value = {nicknameState} onChange = {(e) => setNicknameState(e.target.value)}/>
        <Form.Label style={{color:"white"}}>Email:</Form.Label>
        <Form.Control value = {emailState} onChange = {(e) => setEmailState(e.target.value)}/>
        <Form.Label style={{color:"white"}}>Password:</Form.Label>
        <Form.Control value = {passwordState} onChange = {(e) => setPasswordState(e.target.value)}/>
       <br/>
        <VocalButton type = "submit">{id ? "Update" : "Create"}</VocalButton>
      </Form>
  </div>
  );
};


export default UserForm;