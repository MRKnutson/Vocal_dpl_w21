import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Container } from "react-bootstrap";
import UserImage from "../components/UserImage";
import { PrimaryColor, VocalButton, VocalHeader } from "../components/Styles";
import DeleteUserModal from "../components/DeleteUserModal";

const Profile = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { id, email, password, handleUpdateUser, image } =
    useContext(AuthContext);

  useEffect(() => {
    console.log("mounted");
    getUsers();
  }, []);

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
    setUsers(response.data);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div style={{backgroundColor: "white", height:"auto",marginLeft:"8rem", marginRight:"8rem", marginTop:"5rem", marginBottom:"5rem", borderRadius:"1.5rem", padding:"2rem"}} key={props.id}>
      <h1 style={{marginBottom: "2rem", marginLeft: "4rem", marginTop:"2rem", color:`${PrimaryColor}` }}>My Profile</h1>
      <div style={{display:"flex", justifyContent:"center", marginTop:"2rem"}}>
        {image && <img style={{ width: "10rem", borderRadius:"5rem"}} src={image} />}
      </div>
      <div style={{display:"flex", justifyContent:"center"}}>
          {showUpload && <UserImage toggleUpload={toggleUpload} />}
          {!showUpload && (
            <VocalButton style={{margin:"1rem"}} onClick={toggleUpload}>
              Change Profile Picture
            </VocalButton>
          )}
      </div>
      <br />
      <div>
        <p className="profile-label">Name</p>
        <p className="profile-input">pull name in here</p>
        <p className="profile-label">Email</p>
        <p className="profile-input">{email}</p>
        <p className="profile-label">Password</p>
        <p className="profile-input">******</p>
        <div style={{display:"flex", justifyContent:"right"}}>
        <VocalButton style={{ marginRight: "1rem" }} onClick={toggleForm}>
          {showForm ? "Cancel" : "Update User"}
        </VocalButton>
        {showForm && (
          <UserForm
            id={id}
            email={email}
            password={password}
            handleUpdateUser={handleUpdateUser}
            toggleForm={toggleForm}
          />
        )}
        <VocalButton onClick={() => setShowDeleteModal(true)}>
          Delete User
        </VocalButton>
      <DeleteUserModal
        deleteUser={deleteUser}
        id={id}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      </div>
      {/* <Link style={{textDecoration:"none"}} to="/howto">Getting Started</Link> */}
    </div>
    </div>
  );
};

export default Profile;
