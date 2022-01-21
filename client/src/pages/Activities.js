import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, CardGroup } from "react-bootstrap";
import { ResponsiveCalendar, timeRangeDefaultProps } from "@nivo/calendar";
import axios from "axios";
import { ActionColor, GraphCard, PrimaryColor, SecondaryColor, StatCard, StatText, VocalHeader } from "../components/Styles.js";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend,
} from "react-vis";
import {Chrono} from 'react-chrono';
import logo from '../images/plain_logo.jpg'

const Activities = () => {
  const [useCanvas, setUseCanvas] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [logData, setLogData] = useState([])
  const [photos, setPhotos] =useState([])

  useEffect(() => {
    getRecordings();
    getImages();
    filterDay();
  }, []);

  const getImages = async () => {
    try {
      let response = await axios.get('/api/images')
      setPhotos(response.data)
    } catch (err){
      alert('error grabbing photos')
    }
  };

  const getRecordings = async () => {
    try {
      let response = await axios.get("/api/recordings");
      setRecordings(response.data);
      if(response.data.length>0){
        let dailyRecordings = filterDay(response.data)
        setLogData(dailyRecordings)
      }
      
    } catch (error) {
      alert("error at getRecordings");
    }
  };

  const filterDay = (data) => {
    if(data && data.length > 0){
      let today = formatDate(new Date())
      let todaysLogs = data.filter((recording)=>{
      return(formatDate(recording.created_at) == today)
      })
      return todaysLogs
    }
  };

  const changeData = () => {
    if(recordings && recordings.length > 0){
      return recordings.map((recording) => {
        return { value: 1, day: formatDate(recording.created_at) };
      });
    } else {
      return []
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const longestRecording = () => {
    if(recordings && recordings.length > 0){
      let longest = recordings[0].duration;
      recordings.map((recording) => {
        if (recording.duration > longest) {
          longest = recording.duration;
        }
      });
      return longest.toFixed(0);
    } else {
      return 0
    }
  };

  const totalTime = () => {
    let durationArray = [];
    if(recordings && recordings.length >0) {
      recordings.map((recording) => {
        durationArray.push(recording.duration);
      });
    }
    if(durationArray.length >0) {
      let total = durationArray.reduce((total, amount) => total + amount);
      return total.toFixed(0)
    } else {
      return 0
    };
  };
  const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
  // const content = useCanvas ? "TOGGLE TO SVG" : "TOGGLE TO CANVAS";

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
      return time
    }
  }

  const grabMonth = () => {
    let monthData = recordings.map((recording) => {
      var d = new Date(recording.created_at),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return { mood: recording.mood, month: month, year: year };
    });
    return monthData
  };

  const normalizeMonthData = (mood) => {
    let January  = {x:"Jan", y:0}
    let February = {x:"Feb", y:0}
    let March = {x:"Mar", y:0}
    let April = {x:"Apr", y:0}
    let May = {x:"May", y:0}
    let June = {x:"Jun", y:0}
    let July = {x:"Jul", y:0}
    let August = {x:"Aug", y:0}
    let September = {x:"Sep", y:0}
    let October = {x:"Oct", y:0}
    let November = {x:"Nov", y:0}
    let December = {x:"Dec", y:0}
      grabMonth().map((recording) => {
      if (recording.month == 1 && recording.mood == mood) {
        January.y = January.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        February.y = February.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        March.y = March.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        April.y = April.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        May.y = May.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        June.y = June.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        July.y = July.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        August.y = August.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        September.y = September.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        October.y = October.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        November.y = November.y + 1
      }
      else if (recording.month == 2 && recording.mood == mood) {
        December.y = December.y + 1
      }
    })
    return [January, February, March, April, May, June, July, August, September, October, November, December]
  }

  const normalizeLogsData = () =>{
    if(logData.length > 0){
      return logData.map((recording) =>{
        if(photos && photos.length > 0){
          let filteredPhotos = photos.filter((p)=>p.recording_id == recording.id)
          let photo = filteredPhotos[0]
          let time = formatTime(recording.created_at)
          let length = recording.duration.toFixed(0)
          if(photo){
            return{
              title: `${time}`, cardTitle: recording.title, cardSubtitle: `Length: ${length} minutes`, cardDetailedText: `Notes: ${recording.notes}`, media: {
                name: "Recording Photo", source:{url: photo.pointer}, type: "IMAGE"
              }
            }
          } else{
          return{
              title: `${time}`, cardTitle: recording.title, cardSubtitle: `Length: ${length} minutes`, cardDetailedText: `Notes: ${recording.notes}`
            }
          }
        } else {
          let time = formatTime(recording.created_at)
          let length = recording.duration.toFixed(0)
          return{
            title: `${time}`, cardTitle: recording.title, cardSubtitle: `Length: ${length} minutes`, cardDetailedText: `Notes: ${recording.notes}`
          }
        }
      })
    }
  };


  return (
    <Container>
      <VocalHeader
        style={{ marginTop: "50px", fontSize: "5em" }}
      >
        Activity
      </VocalHeader>
      <Row md = {1} lg = {3} style ={{display: "flex", justifyContent: "space-between"}}>
        <Col style = {{display:"flex", justifyContent: "space-around"}}>
            <StatCard >
              {/* <Card.Image variant = "top" /> */}
              <StatText as="h2">Entries Saved: {recordings.length}</StatText>
            </StatCard>
        </Col>
        <Col style = {{display:"flex", justifyContent: "space-around"}}>
            <StatCard style ={{backgroundColor: `${ActionColor}`, color: "white"}}>
              <StatText as="h2">Total time recorded: {totalTime()} minutes</StatText>
            </StatCard>
        </Col>
        <Col style = {{display:"flex", justifyContent: "space-around"}}>     
            <StatCard style ={{backgroundColor: `${SecondaryColor}`, color: "white"}}>
              <StatText as="h2">Longest entry: {longestRecording()} minutes</StatText>
            </StatCard>
        </Col>
      </Row>
      
      <GraphCard style ={{margin:"20px"}}>
        <h2 style={{ margin: "1.5rem" }}>Annual Activity</h2>
        <div style={{ width: "100%", height: 500, marginBottom: "50px" }}>
          {/* to work on this calendar use: https://nivo.rocks/calendar/ */}
          <ResponsiveCalendar
            data={changeData()}
            from={new Date(new Date().getFullYear(), 0, 1)}
            to="2022-12-31"
            emptyColor="#eeeeee"
            textColor="#ffffff"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            theme = {{
              textColor: "white",
              backgroundColor: `${PrimaryColor}`
            }}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor={SecondaryColor}
            dayBorderWidth={2}
            dayBorderColor={SecondaryColor}
            legends={[
              {
                anchor: "bottom-right",
                direction: "row",
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: "right-to-left",
              },
            ]}
          />
        </div>
      </GraphCard>
      <GraphCard style = {{paddingBottom: "75px"}}>
      <h2 style={{ margin: "1.5rem" }}>Entries by Mood</h2>
      <div>
        <XYPlot yDomain = {[0,32]}  style={{margin:"50px"}} width={1000} height={600} stackBy="y" xType = "ordinal" >
        <DiscreteColorLegend
            style={{position: 'relative', left: '950px', top: '-610px'}}
            orientation="horizontal"
            items={[
              {
                title: 'Mood1',
                color: 'red'
              },
              {
                title: 'Mood2',
                color: 'orange'
              },
              {
                title: 'Mood3',
                color: 'blue'
              },
              {
                title: 'Mood4',
                color: 'green'
              },
              {
                title: 'Mood5',
                color: 'yellow'
              },
            ]}
          />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
          title = "Month"
          style = {{
            line: {stroke: 'white'},
            text: {fill: 'white'}
          }}
          />
          <YAxis 
          title = "Number of Entries"
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: 'white', fontWeight: 600}
          }}
            />
          <BarSeries
            cluster = "mood1"
            color = "red"
            data={normalizeMonthData(1)}
          />
          <BarSeries
            cluster = "mood2"
            color = "orange"
            data={normalizeMonthData(2)}
          />
          <BarSeries
            cluster = "mood3"
            color = "blue"
            data={normalizeMonthData(3)}
          />
          <BarSeries
            cluster = "mood4"
            color = "green"
            data={normalizeMonthData(4)}
          />
          <BarSeries
            cluster = "mood5"
            color = "yellow"
            data={normalizeMonthData(5)}
          />
        </XYPlot>
      </div>
      </GraphCard>
      {logData.length>1 && <GraphCard>
        <h2 style={{ margin: "1.5rem" }}>Daily Log</h2>
        <div style ={{height: "35rem", width: "100%", paddingTop: "1.5rem"}}>
          <Chrono 
            cardPositionHorizontal = "TOP"
            items = {normalizeLogsData()} 
            mode = "HORIZONTAL" 
            theme = {{
              primary: `gray`,
              secondary: `${PrimaryColor}`,
              cardBgColor: `${PrimaryColor}`,
              cardForeColor: "white",
              titleColor: `white`
            }}
          />
        </div>
      </GraphCard>}
    </Container>
  );
};

export default Activities;
