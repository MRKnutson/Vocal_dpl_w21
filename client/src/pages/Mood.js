import axios from "axios";
import React, { useEffect, useState } from "react";
import '../StylesFolder/Styles_Mood.css';
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  Legend
} from "recharts";
import { VocalHeader, VocalButton } from "../components/Styles";
import { Link } from "react-router-dom";
import label from "../images/label.png"

// export default here
export default function Mood() {
  const [recordings, setRecordings] = useState([]);
  const [timeChoice, setTimeChoice] = useState(null);
  const [rDate, setRDate] = useState([]);

      useEffect(() => {
        getRecordings();
      },[])
    
      const getRecordings = async () => {
        try { 
          let response = await axios.get("/api/recordings");
          let gotRecordings = response.data.reverse();
          let get20 = gotRecordings.splice(20, gotRecordings.length);
          setRecordings(gotRecordings.reverse()) ;
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
        let renderFormatedRecs = []
        let returnedRecs = recordings.slice((recordings.length - timeChoice), recordings.length);
        returnedRecs.map((r)=>{
              let color = ""
                if (r.mood==1){
                  color =  "#0089FC"
                } if (r.mood==2) {
                  color = "#15FA14"
                } if (r.mood==3) {
                  color = "#FAF503"
                } if (r.mood==4) {
                  color = "#FB9D00"
                } if (r.mood==5) {
                  color = "#FC0889"
                }
          let dateAndTime = formatDate(r.created_at) + " " + formatTime(r.created_at);
         renderFormatedRecs.push({
           title: r.title,
           fill: color,
           mood: r.mood,
           date: dateAndTime
          });
        });
        return renderFormatedRecs
      }


      //  Renders data for showing all recordings
      const renderDataForGraph = () => {
        // if True, renders dropped down selected data
        if (timeChoice && (timeChoice != 'All')) return renderSelectedDate();
          // if False, Normal data here
          let normalizedData = [] 
              recordings.map((r)=> {
                let color = ""
                if (r.mood==1){
                  color =  "#0089FC"
                } if (r.mood==2) {
                  color = "#15FA14"
                } if (r.mood==3) {
                  color = "#FAF503"
                } if (r.mood==4) {
                  color = "#FB9D00"
                } if (r.mood==5) {
                  color = "#FC0889"
                }
                // console.log(color)
              let dateAndTime = formatDate(r.created_at) + " " + formatTime(r.created_at);
                normalizedData.push({
                  title: r.title,
                  fill: color,
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
      <>
        <Container>
          {!recordings.length > 0 && (
          <>
          <Container style={{display:"flex", justifyContent:"center", marginTop:"10rem"}}>
          <h3 style={{color:"white"}}>No Recordings Yet....</h3>
          </Container>
          <Container style={{display:"flex", justifyContent:"center"}}>
          <VocalButton><Link style={{color:"white",textDecoration:"none"}} to='/'>Go to Recorder</Link></VocalButton>
          </Container>
          </>
        )}
        {recordings.length > 0 && (<><VocalHeader style={{ marginTop: "3rem", marginLeft: "3rem" }}>Track Your Mood</VocalHeader><div style={{ display: "flex", justifyContent: "right" }}>
          <DropdownButton id="dropdown_moods" title="Most Recent" onSelect={handleSelection}>
            <Dropdown.Item eventKey="5"> 5 </Dropdown.Item>
            <Dropdown.Item eventKey="10"> 10 </Dropdown.Item>
            <Dropdown.Item eventKey="15"> 15 </Dropdown.Item>
            <Dropdown.Item eventKey="20"> 20 </Dropdown.Item>
          </DropdownButton>
        </div><div id="moods_container">
                  <img style={{height:"5rem", float:"right", marginBottom:"-5rem", marginTop:"-4rem", marginRight:"-1rem"}} src = {label} alt="label"/>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={renderDataForGraph()} barSize={60}>
                <YAxis stroke="white" type="number" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]}>
                  <Label angle={270} position='left' stroke="#FFFF" style={{ textAnchor: 'middle' }}>
                    Mood
                  </Label>
                </YAxis>
                <XAxis dataKey="date" stroke="white">
                  {/* <Label angle={0} position='outsideBottom' stroke="#FFFF" style={{ textAnchor: 'center'}}>
        Date/Time
      </Label> */}
                </XAxis>
                <Bar dataKey="mood"
                  fill="uv"
                  // label dataKey='mood'
                  radius={10} />
                <Label value="mood" dataKey="mood" position="insideRight" />
              </BarChart>
            </ResponsiveContainer>
          </div></>)}
      </Container>
      <h2 style={{color:"white", marginTop:"6.5rem", display:"flex", justifyContent:"center"}}>Not happy with your mood recently? Check out these resouces.</h2>
      <div style={{display:"flex", justifyContent:"space-around"}}>
      <a className="happy-link" href="https://www.happybrainscience.com/resources/">Happy Brain Science</a>
      <a className="happy-link" href="https://www.helpguide.org/articles/mental-health/cultivating-happiness.htm">Cultivating Happiness</a>
      <a className="happy-link" href="https://www.unh.edu/pacs/positive-psychology-strategies-increased-happiness">Positive Psychology Strategies</a>
      </div>
      </>
  );
}