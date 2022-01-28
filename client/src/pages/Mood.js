import axios from "axios";
import React, { useEffect, useState } from "react";
import '../StylesFolder/Styles_Mood.css';
import { DateTime } from "luxon";
import { DropdownButton, Dropdown } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label
} from "recharts";

// export default here
export default function Mood() {
  const [recordings, setRecordings] = useState([]);
  const [timeChoice, setTimeChoice] = useState(null);
  const [rDate, setRDate] = useState([]);
  // let todayDate = new Date();
  // console.log(todayDate)

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

      // Formats time for the UI/UX
      const formatTime = (dateTime) => {
        let d = new Date(dateTime)
        let hrs = d.getHours()
        let mins = d.getMinutes()
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

      //  Formats date for the UI/UX
      const formatDate = (date) => {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();
          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;
        return (`${month}/${day}/${year}`);
      }
      // Function to render only selected data
      const renderSelectedDate = () => {
        console.log("selected hit")
      }


      //  Renders data for showing all recordings
      const renderDataForGraph = () => {
        // if True, renders dropped down selected data
        if (timeChoice) return renderSelectedDate();
          // if False, Normal data here
          let normalizedData = [] 
              recordings.map((r)=> {
                console.log(r.created_at)
              let dateAndTime = formatDate(r.created_at) + " " + formatTime(r.created_at);
                normalizedData.push({
                  title: r.title,
                  uv: r.mood,
                  mood: r.mood,
                  date: dateAndTime
            }); 
          });
          return normalizedData;
      }

      const handleSelection = (e) => {
        setTimeChoice(e)
      }

      // this is the return
    return (
        <div>
        <h3>Todays Date: {DateTime.now().toLocaleString()} </h3>

              <DropdownButton id="dropdown_moods" title="Dont Use me, I break things" onSelect={handleSelection}>
                  <Dropdown.Item eventKey="1"> Day </Dropdown.Item>
                  <Dropdown.Item eventKey="7"> Week </Dropdown.Item>
                  <Dropdown.Item eventKey="30"> Month </Dropdown.Item>
                  <Dropdown.Item eventKey="365"> Year </Dropdown.Item>
              </DropdownButton>
        <div id="moods_container">
              <h2>Moods</h2>
              <ResponsiveContainer width="100%" height={400}>
              <BarChart    data={renderDataForGraph()}>
                  <YAxis stroke="white" /> 
                  <XAxis dataKey="date" stroke="white" /> 
                  {/* <Tooltip /> */}
                <Bar dataKey="uv" 
                  fill="#ef4b4c"
                  label dataKey='mood'
                  />
                <Label value="mood" dataKey="mood" position="insideRight" />
              </BarChart>
              </ResponsiveContainer>
          </div>
      </div>
  );
}