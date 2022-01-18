import React, {useState} from "react";
import axios from "axios";
import {Button, Form} from 'react-bootstrap'
import UserImage from '../components/UserImage'

const UserForm = (props) => {

  const {newestUser, id, handleUpdateUser, email:initialEmail, password:initialPassword, toggleForm} = props

  const [emailState, setEmailState] = useState(initialEmail ? initialEmail: "");
  const [passwordState, setPasswordState] = useState(initialPassword ? initialPassword : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {email: emailState, password: passwordState};
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
  <div style={styles.form}>
    <h1>{id ? "Update" : "New"}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Email:</Form.Label>
        <Form.Control value = {emailState} onChange = {(e) => setEmailState(e.target.value)}/>
        <Form.Label>Password:</Form.Label>
        <Form.Control value = {passwordState} onChange = {(e) => setPasswordState(e.target.value)}/>
       <br/>
        <Button type = "submit">{id ? "Update" : "Create"}</Button>
      </Form>
  </div>
  );
};

const styles = {
  form: {
    border: "3px solid blue",
    margin: "5px",
    padding: "5px"
  }
};

export default UserForm;