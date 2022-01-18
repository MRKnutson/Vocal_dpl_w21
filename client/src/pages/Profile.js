import React, {useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import {Container} from 'react-bootstrap'
import UserImage from '../components/UserImage';

const Profile = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [users, setUsers] = useState([]);


  const {id, email, password, handleUpdateUser, image} = useContext(AuthContext);

  useEffect(() => {
    console.log("mounted");
    getUsers();
  },[]);
  

  const toggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const toggleForm = () => {
   setShowForm(!showForm);
 };

  const deleteUser = async () => {
  let response = await axios.delete(`/api/auth`);
  let filteredUsers = users.filter((user) => user.id !== id);
  setUsers(filteredUsers);
  refreshPage();
  };

  const getUsers = async () => {
  let response = await axios.get("/api/users");
  setUsers(response.data)
  };

  function refreshPage(){
  window.location.reload(false);
  };

  return (
    <Container key={props.id}>
      <h1>My Profile</h1>
      {image && <img style = {{width:"300px"}} src = {image}/>}
      {/* <p>ID: {id}</p> */}
      <br/>
      <div style={{margin:"20px"}}>
      {showUpload && <UserImage toggleUpload = {toggleUpload}/>}
      {!showUpload && <button onClick = {toggleUpload}>Change Profile Picture</button>}
      </div>
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