import React from "react";
import {AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer} from "recharts";
  import {Card, Container} from "react-bootstrap";

  const data = [
    //we can add the average for each month here, or maybe use a map for each day? 
    //used random month values for dummy example
    {
      name: "January",
      uv: 5,
    },
    {
      name: "March",
      uv: 2,
    },
    {
      name: "April",
      uv: 3,
    },
    {
      name: "May",
      uv: 5,
    },
    {
      name: "June",
      uv: 5,
    },
    {
      name: "July",
      uv: 4,
    },
    {
      name: "August",
      uv: 4,
    },
    {
      name: "September",
      uv: 3,
    },
    {
      name: "October",
      uv: 2,
    },
    {
      name: "November",
      uv: 3,
    },
    {
      name: "December",
      uv: 2,
    }
  ];

const Mood = () => {

 //add in function to find average of all moods

  return (
    <Container>
      <h1 className="header" style={{marginTop:"50px", fontSize:"5em", textAlign:"center"}}>Mood</h1>
      <h2 style={{textAlign:"center", marginBottom:"50px"}}>Welcome to your moods page! See your average mood, track your mood over time, and check out resources to improve your mood.</h2>
      {/* this is just a placeholder for the average mood... integer=color eventually? */}
      <Card className = "card" style={{ width: '15rem', margin:"auto", marginBottom:"50px"}}>
  <Card.Img style={{padding:"20px"}} variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png" />
  <Card.Body>
    <Card.Title style={{textAlign:"center"}}>Average Mood</Card.Title>
    <Card.Text style={{textAlign:"center"}}>
      This is your average mood this year!
    </Card.Text>
    {/* <Button variant="primary">Go somewhere</Button> */}
  </Card.Body>
</Card>
    <div style={{ width: "100%", height: 500, marginBottom:"50px" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
          >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </Container>
  )
}

export default Mood;