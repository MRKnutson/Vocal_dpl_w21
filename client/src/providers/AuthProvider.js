import React, { useState } from 'react'
import axios from 'axios'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([])

  const handleRegister = async (user, navigate)=>{
    try {
      let response = await axios.post('api/auth', user);
      setUser(response.data.data)
      navigate('/')
    } catch (err) {
      // console.log(err.response.data.errors.full_messages)
      // alert(err.response.data.errors.full_messages)
      setErrors(err.response.data.errors.full_messages)
    }
  };

  const handleLogin = async (user, navigate)=>{
    try{
      let response = await axios.post('/api/auth/sign_in', user);
      setUser(response.data.data)
      navigate("/")
    } catch (err) {
      // console.log(err.response.data.errors)
      // alert(err.response.data.errors)
      setErrors(err.response.data.errors)
    };
  };

  const handleLogout = async (navigate) => {
    try {
      let response = await axios.delete('api/auth/sign_out');
      localStorage.removeItem('access-token');
      setUser(null);
      navigate('/login')
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    };
  };

  const handleUpdateUser = async (user) => {
    try {
      let response = await axios.put('/api/auth', user)
      setUser(response.data.data)
    } catch (err) {
      console.log(err.response.data.errors.full_messages)
      alert(err.response.data.errors.full_messages)
    };
  };
  // console.log(errors)
  return(
    <AuthContext.Provider value ={{
      ...user,
      errors,
      setUser,
      handleRegister,
      handleLogin,
      handleLogout,
      handleUpdateUser,
      authenticated: user !== null,
    }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;