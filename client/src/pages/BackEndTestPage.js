import axios from 'axios';
import React, { useEffect, useState } from 'react';


const RenderSomething = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    getStuff();
  }, []);

  const getStuff = async () => {
  let res = await axios.get('/api/tags')
    console.log(res.data)
    setData(res.data)
  }


return (
  <div> 
    <p>Back End Test</p>
    {JSON.stringify(data)}
     </div>

)
}
export default RenderSomething; 