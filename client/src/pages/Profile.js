import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import { Container } from "react-bootstrap";
import UserImage from "../components/UserImage";
import { VocalButton, VocalHeader } from "../components/Styles";
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
    <Container key={props.id}>
      <VocalHeader
        style={{ marginTop: "5rem", marginBottom: "2rem", marginLeft: "4rem" }}
      >
        My Profile
      </VocalHeader>
      {image && <img style={{ width: "300px" }} src={image} />}
      {/* <p>ID: {id}</p> */}
      <br />
      <div style={{ marginLeft: "6rem" }}>
        <p style={{ color: "white" }}>Email: {email}</p>
        <p style={{ color: "white" }}>Password: ****** </p>
        <div style={{ marginBottom: "1rem", marginTop: "3rem" }}>
          {showUpload && <UserImage toggleUpload={toggleUpload} />}
          {!showUpload && (
            <VocalButton onClick={toggleUpload}>
              Change Profile Picture
            </VocalButton>
          )}
        </div>
        <VocalButton style={{ marginRight: "1rem" }} onClick={toggleForm}>
          {showForm ? "Cancel" : "Update"}
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
      </div>
      <DeleteUserModal
        deleteUser={deleteUser}
        id={id}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      {/* <Link style={{textDecoration:"none"}} to="/howto">Getting Started</Link> */}
    </Container>
  );
};

export default Profile;
