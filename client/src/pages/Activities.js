import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { ResponsiveCalendar } from "@nivo/calendar";
import axios from "axios";
import { StatCard, StatText } from "../components/Styles.js";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
} from "react-vis";

const data = [
  { title: "this is a recording 1", duration: 101, mood: 3 },
  { title: "this is a recording 2", duration: 15, mood: 4 },
  { title: "this is a recording 3", duration: 45, mood: 2 },
  { title: "this is a recording 4", duration: 100006, mood: 5 },
];

const Activities = () => {
  const [useCanvas, setUseCanvas] = useState(false);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    console.log("recordings mounted");
    getRecordings();
  }, []);

  const getRecordings = async () => {
    try {
      let response = await axios.get("/api/recordings");
      console.log(response.data);
      setRecordings(response.data);
    } catch (error) {
      alert("error at getRecordings");
    }
  };

  const changeData = () => {
    return recordings.map((recording) => {
      return { value: 1, day: formatDate(recording.created_at) };
    });
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
    let longest = data[0].duration;
    data.map((recording) => {
      if (recording.duration > longest) {
        longest = recording.duration;
      }
    });
    return (longest / 60).toFixed(0);
  };

  const totalTime = () => {
    let durationArray = [];
    data.map((recording) => {
      durationArray.push(recording.duration);
    });
    let total = durationArray.reduce((total, amount) => total + amount);
    return (total / 60).toFixed(0);
  };
  const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
  const content = useCanvas ? "TOGGLE TO SVG" : "TOGGLE TO CANVAS";

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
    let January  = {x:"1", y:0}
    let February = {x:"2", y:0}
    let March = {x:"3", y:0}
    let April = {x:"4", y:0}
    let May = {x:"5", y:0}
    let June = {x:"6", y:0}
    let July = {x:"7", y:0}
    let August = {x:"8", y:0}
    let September = {x:"9", y:0}
    let October = {x:"10", y:0}
    let November = {x:"11", y:0}
    let December = {x:"12", y:0}
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


  return (
    <Container>
      <h1
        className="header"
        style={{ marginTop: "50px", fontSize: "5em", textAlign: "center" }}
      >
        Activities
      </h1>
      <StatCard>
        <StatText as="h2">Entries Saved: {recordings.length}</StatText>
      </StatCard>
      <StatCard>
        <StatText as="h2">Total time recorded: {totalTime()}</StatText>
      </StatCard>
      <StatCard>
        <StatText as="h2">Longest entry: {longestRecording()} minutes</StatText>
      </StatCard>
      <Card>
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
      <div>
        <XYPlot yDomain = {[0,5]} xDomain={[0, 12]} style={{margin:"50px"}} width={1000} height={600} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries
            data={normalizeMonthData(1)}
          />
          <BarSeries
            data={normalizeMonthData(2)}
          />
          <BarSeries
            data={normalizeMonthData(3)}
          />
          <BarSeries
            data={normalizeMonthData(4)}
          />
          <BarSeries
            data={normalizeMonthData(5)}
          />
        </XYPlot>
      </div>
    </Container>
  );
};

export default Activities;
