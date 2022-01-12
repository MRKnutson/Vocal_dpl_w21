import React, { useContext } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';
import Recorder from '../components/Recorder'
const Home =  () => {
  const auth = useContext(AuthContext)
  return(
    <div>
      <h1>Home</h1>
      <Recorder />
    </div>
  )
};

export default Home;