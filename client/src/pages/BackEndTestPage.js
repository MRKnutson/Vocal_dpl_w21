import axios from 'axios';
import React, { useEffect, useState } from 'react';


const RenderSomething = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    getAllStuff();
  }, []);

  const getAllStuff = async () => {
    let res = await axios.get('/api/recordings')
      setData(res.data.length)
      console.log('getAllStuff hit')
    }

  const getStuff = async () => {
    console.log('getStuff hit')
  let res = await axios.delete('/api/recordings/1')
    getAllStuff();
  }


return (
      <div> 
    <p>Back End Test</p>
    {JSON.stringify(data)}

    <button onClick={getStuff}>Press Me</button>
     </div>

)
}
export default RenderSomething; 