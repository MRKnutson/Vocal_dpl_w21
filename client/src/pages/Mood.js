import React from "react";
import {AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer} from "recharts";
  import {Card, Container} from "react-bootstrap";
  import {ResponsiveCalendar} from "@nivo/calendar";



  const data = [
    //we can add the average for each month here, or maybe use a map for each day? 
    //used random month values for dummy example
    {
      name: "January",
      uv: 5,
      "value": 5,
      "day": "2022-01-01"
    },
    {
      name: "February",
      uv: 2,
      "value": 2,
      "day": "2022-02-01"
    },
    {
      name: "March",
      uv: 2,
      "value": 2,
      "day": "2022-03-01"
    },
    {
      name: "April",
      uv: 3,
      "value": 3,
      "day": "2022-04-01"
    },
    {
      name: "May",
      uv: 5,
      "value": 5,
      "day": "2022-05-01"
    },
    {
      name: "June",
      uv: 5,
      "value": 5,
      "day": "2022-06-01"
    },
    {
      name: "July",
      uv: 4,
      "value": 4,
      "day": "2022-07-01"
    },
    {
      name: "August",
      uv: 4,
      "value": 4,
      "day": "2022-08-01"
    },
    {
      name: "September",
      uv: 3,
      "value": 3,
      "day": "2022-09-01"
    },
    {
      name: "October",
      uv: 2,
      "value": 2,
      "day": "2022-10-01"
    },
    {
      name: "November",
      uv: 3,
      "value": 3,
      "day": "2022-11-01"
    },
    {
      name: "December",
      uv: 2,
      "value": 2,
      "day": "2022-12-01"
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
          <Card.Text style={{textAlign:"center"}}>This is your average mood this year!</Card.Text>
    {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
      <div style={{ width: "100%", height: 500, marginBottom:"50px" }}>
    {/* work on area chart here https://recharts.org/en-US/examples/SimpleAreaChart */}
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#06FF9F" />
          </AreaChart>
        </ResponsiveContainer>
    {/* to work on this calendar use: https://nivo.rocks/calendar/ */}
        <ResponsiveCalendar
          data={data}
          from={new Date(new Date().getFullYear(), 0, 1)}
          to="2022-12-31"
          emptyColor="#eeeeee"
          colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}/>
      </div>
      <div style={{marginTop:"500px", marginBottom:"50px"}}>
        <h3>Helpful Resources</h3>
        <a className = "link" href="https://www.happybrainscience.com/resources/">Happy Brain Science</a>
          <br/>
        <a className = "link" href="https://www.unh.edu/pacs/positive-psychology-strategies-increased-happiness">Positice Psychology Strategies</a>
          <br/>
        <a className = "link" href="https://projecthappiness.org/">Project Happiness</a>
      </div>
    </Container>
  )
}

export default Mood;