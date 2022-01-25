import axios from "axios";
import React, { useEffect, useState } from "react";
import '../StylesFolder/Styles_Mood.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
];

// export default here
export default function Mood() {
  const [recordings, setRecordings] = useState([]);

      useEffect(() => {
        console.log("recordings mounted");
        getRecordings();
      },[])
    
      const getRecordings = async () => {
        try { 
          let response = await axios.get("/api/recordings");
          setRecordings(response.data) 
        } catch (error){
          alert ("error at getRecordings")
        }
      }

      const formatTime = (dateTime) => {
        let d = new Date(dateTime)
        let hrs = d.getHours()
        let mins = d.getMinutes()
        // if(hrs <= 9)
        // hrs = "0" + hrs
        // if(mins < 10)
        // mins = "0" + mins
        // const time = hrs+":"+mins
        if(hrs < 12){
          if (mins <10){
            mins = "0"+ mins
          }
          let time = hrs+":"+mins+" AM"
          return time
        } else if (hrs <13 && mins<60){
          if (mins <10){
            mins = "0"+ mins
          }
          let time = hrs+":"+mins+" PM"
          return time
        } else {
          if (mins <10){
            mins = "0"+ mins
          }
          let PMhrs = hrs - 12
          let time = PMhrs+":"+mins+" PM"
          return time;
        }
      }
      const formatDate = (date) => {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
    
        return (`${month}/${day}/${year}`);
      }

      const renderDataForGraph = () => {
        let normalizedData = [] 
        recordings.map((r)=> {
          // r.created_at = formatDate(r.created_at)
          // r.created_at = formatTime(r.created_at)
          console.log(r)
          normalizedData.push({
            title: r.title,
            uv: r.mood,
            mood: r.mood,
            date: r.created_at
          })
        }); return normalizedData;
      }


    return (
    <div id="moods_container">
      <h2>Moods</h2>
        <BarChart
          width={1000}
          height={500}
          data={renderDataForGraph()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={35}
        >
          <XAxis dataKey="title" />
          {/* <YAxis /> */}
          <Tooltip dataKey="title" />
          {/* <Legend /> */}
          <Bar dataKey="mood" fill="#ef4b4c" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
    </div>
  );
}