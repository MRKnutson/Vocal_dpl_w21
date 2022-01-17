import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import {Container} from 'react-bootstrap'

const Profile = (props) => {

  const {id, email, password, handleUpdateUser, image} = useContext(AuthContext);

  useEffect(() => {
    console.log("mounted");
    getUsers();
  },[]);
  
  const [showForm, setShowForm] = useState(false);

 const toggleForm = () => {
   setShowForm(!showForm);
 };

 const deleteUser = async (id) => {
  let response = await axios.delete(`/api/users/${id}`);
  let filteredUsers = users.filter((user) => user.id !== id);
  setUsers(filteredUsers);
  refreshPage();
};

const getUsers = async () => {
  let response = await axios.get("/api/users");
  setUsers(response.data)
};

const [users, setUsers] = useState([]);


function refreshPage(){
  window.location.reload(false);
};

  return (
    <Container key={props.id}>
      <h1>My Profile</h1>
      {image && image}
      <p>ID: {id}</p>
      <p>Email: {email}</p>
      <p>Password: ****** </p>
      <button onClick = {toggleForm}>
        {showForm ? "Cancel" : "Update"}
      </button>
      {showForm && <UserForm id = {id} email = {email} password = {password} handleUpdateUser = {handleUpdateUser} toggleForm = {toggleForm}/>}
    <button onClick={() => deleteUser(id)}>Delete</button>
    </Container>
  );
};

export default Profile;