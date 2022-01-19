import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { ResponsiveCalendar } from "@nivo/calendar";
import axios from "axios";
import { PrimaryColor, SecondaryColor, StatCard, StatText, VocalHeader } from "../components/Styles.js";
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

const Activities = () => {
  const [useCanvas, setUseCanvas] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [logData, setLogData] = useState([])

  useEffect(() => {
    getRecordings();
    filterDay();
  }, []);

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
    if(hrs <= 9)
    hrs = "0" + hrs
    if(mins < 10)
    mins = "0" + mins
    const time = hrs+":"+mins
    return time
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
        let time = formatTime(recording.created_at)
        let length = recording.duration
        return{
          title: `${time}`, cardTitle: recording.title, cardSubtitle: `Length: ${length} minutes`, cardDetailedText: `Notes: ${recording.notes}`
        }
      })
    }
  };


  return (
    <Container>
      <VocalHeader
        style={{ marginTop: "50px", fontSize: "5em", textAlign: "center" }}
      >
        Activities
      </VocalHeader>
      <StatCard>
        <StatText as="h2">Entries Saved: {recordings.length}</StatText>
      </StatCard>
      <StatCard>
        <StatText as="h2">Total time recorded: {totalTime()} minutes</StatText>
      </StatCard>
      <StatCard>
        <StatText as="h2">Longest entry: {longestRecording()} minutes</StatText>
      </StatCard>
      <Card style ={{margin:"20px"}}>
        <h2 style={{ margin: "20px" }}>Activities Graphs</h2>
        <div style={{ width: "100%", height: 500, marginBottom: "50px" }}>
          {/* to work on this calendar use: https://nivo.rocks/calendar/ */}
          <ResponsiveCalendar
            data={changeData()}
            from={new Date(new Date().getFullYear(), 0, 1)}
            to="2022-12-31"
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
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
      </Card>
      <Card style = {{paddingBottom: "75px", margin:"20px"}}>
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
          />
          <YAxis 
          title = "Number of Entries"
          style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
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
      </Card>
      {logData.length>1 && <Card className = "justify-content-center" style ={{ backgroundColor: `${SecondaryColor}`,margin: "20px", paddingBottom: "30px", paddingTop:"30px"}}>
        <div style ={{height: "400px", width: "100%"}}>
          <Chrono 
            cardPositionHorizontal = "TOP"
            items = {normalizeLogsData()} 
            mode = "HORIZONTAL" 
            theme = {{
              primary: `${PrimaryColor}`,
              secondary: "lightgray",
              cardBgColor: `${PrimaryColor}`,
              cardForeColor: "white",
              titleColor: `${PrimaryColor}`
            }}
          />
        </div>
      </Card>}
    </Container>
  );
};

export default Activities;
