import React, {useState, useContext} from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";

const User = (props) => {
  const {id, email, password} = props

  const [showForm, setShowForm] = useState(false);

 const toggleForm = () => {
   setShowForm(!showForm);
 };

  return (
    <div className="user" key={props.id}>
        <p> ID: {id} </p>
        <p>Email: {email}</p>
        {/* <span> Password: {password}</span> */}
    </div>
  );
};

export default User;