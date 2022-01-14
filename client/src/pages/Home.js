import React, { useContext, useState } from 'react'
import RenderJson from '../components/RenderJson';
import { AuthContext } from '../providers/AuthProvider';
import Recorder from '../components/Recorder'
import EntryModal from '../components/EntryModal';
const Home =  () => {
  const auth = useContext(AuthContext)
  const [show,setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  };

  const handleShow =()=>{
    setShow(true)
  };

  const handleSave = () => {
    setShow(false)
  };
  return(
    <div>
      <h1>Home</h1>
      <Recorder />
    </div>
  )
};

export default Home;