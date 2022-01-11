import React, { useContext } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';
import RecordTest from '../components/RecordTest'
const Home =  () => {
  const auth = useContext(AuthContext)
  return(
    <div>
      <h1>Home</h1>
      <RenderJson json={auth} />
      <RecordTest />
    </div>
  )
};

export default Home;