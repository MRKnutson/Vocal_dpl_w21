import axios from "axios";
import React, { useEffect, useState } from "react";
import '../StylesFolder/Styles_Mood.css';
import { DateTime } from "luxon";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label
} from "recharts";
import { VocalHeader, FilterButton } from "../components/Styles";

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
        var d = new Date();
          d.setDate(d.getDate() - parseInt(timeChoice));
          let returnRecs = []
          let validRecs = recordings.filter((r)=> formatDate(r.created_at) > formatDate(d))
          validRecs.map((r)=>{
            let dateAndTime = formatDate(r.created_at) + " " + formatTime(r.created_at);
            returnRecs.push({
              title: r.title,
              uv: r.mood,
              mood: r.mood,
              date: dateAndTime
            }); 
          });
          return returnRecs;
      }


      //  Renders data for showing all recordings
      const renderDataForGraph = () => {
        // if True, renders dropped down selected data
        if (timeChoice && (timeChoice != 'All')) return renderSelectedDate();
          // if False, Normal data here
          let normalizedData = [] 
              recordings.map((r)=> {
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
        <Container>
        <VocalHeader style={{marginTop:"3rem", marginLeft:"3rem"}}>Track Your Mood</VocalHeader>
          <div style={{display:"flex", justifyContent:"right"}}>
              <DropdownButton id="dropdown_moods" title="Filter" onSelect={handleSelection}>
                  <Dropdown.Item eventKey="1"> Day </Dropdown.Item>
                  <Dropdown.Item eventKey="7"> Week </Dropdown.Item>
                  <Dropdown.Item eventKey="30"> Month </Dropdown.Item>
                  <Dropdown.Item eventKey="All"> All </Dropdown.Item>
              </DropdownButton>
          </div>
              {/* <h2 style={{color:"white", fontSize:"1.2rem"}}>Today's Date: {DateTime.now().toLocaleString()} </h2> */}
        <div id="moods_container">
              <ResponsiveContainer width="100%" height={400}>
              <BarChart    data={renderDataForGraph()} barSize={60}>
                  <YAxis stroke="white" /> 
                  <XAxis dataKey="date" stroke="white" /> 
                  {/* <Tooltip /> */}
                <Bar dataKey="uv" 
                  fill="#ef4b4c"
                  // label dataKey='mood'
                  radius={10}
                  />
                <Label value="mood" dataKey="mood" position="insideRight" />
              </BarChart>
              </ResponsiveContainer>
          </div>
      </Container>
  );
}