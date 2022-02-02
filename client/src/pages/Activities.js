import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, CardGroup } from "react-bootstrap";
import { ResponsiveCalendar, timeRangeDefaultProps } from "@nivo/calendar";
import axios from "axios";
import {
  ActionColor,
  GraphCard,
  PrimaryColor,
  SecondaryColor,
  StatCard,
  StatText,
  VocalButton,
  VocalHeader,
} from "../components/Styles.js";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
} from "react-vis";
import { Chrono } from "react-chrono";
import label from "../images/label.png";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";
import ClockActivity from "../images/ClockActivity.png";
import Stopwatch from "../images/Stopwatch.png";
import Lightbulb from "../images/Lightbulb.png";
import DailyLogModal from "../components/DailyLogModal.js";
import lightbulb2 from "../images/lightbulb2.png";
import stopwatch3 from "../images/stopwatch3.png";
import clock2 from "../images/clock2.png";

const Activities = () => {
  const [useCanvas, setUseCanvas] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [logData, setLogData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [recordingShow, setRecordingShow] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recordingPhotos, setRecordingPhotos] = useState(null);

  useEffect(() => {
    getRecordings();
    filterDay();
  }, []);

  const getRecordings = async () => {
    try {
      let images = await axios.get("/api/images");
      setPhotos(images.data);
      let response = await axios.get("/api/recordings");
      setRecordings(response.data);
      if (response.data.length > 0) {
        let dailyRecordings = filterDay(response.data);
        setLogData(dailyRecordings);
      }
    } catch (error) {
      alert("error at getRecordings");
    }
  };

  const filterDay = (data) => {
    if (data && data.length > 0) {
      let today = formatDate(new Date());
      let todaysLogs = data.filter((recording) => {
        return formatDate(recording.created_at) == today;
      });
      return todaysLogs;
    }
  };

  const changeData = () => {
    if (recordings && recordings.length > 0) {
      let d = new Date();
      // To set to future next line should be
      // d.setDate(new Date().getDate()+ 205);
      d.setDate(new Date().getDate());
      let today = formatDate(d);
      let daysRecording = recordings.filter((r) => {
        return formatDate(r.created_at) == today;
      });
      if (daysRecording.length > 0) {
        return recordings.map((recording) => {
          if (formatDate(recording.created_at) !== today) {
            return { value: 5, day: formatDate(recording.created_at) };
          } else {
            return { value: 1, day: today };
          }
        });
      } else {
        let dataArray = recordings.map((recording) => {
          return { value: 5, day: formatDate(recording.created_at) };
        });
        dataArray.push({ value: 1, day: today });
        return dataArray;
      }
    } else {
      return [];
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
    if (recordings && recordings.length > 0) {
      let longest = recordings[0].duration;
      recordings.map((recording) => {
        if (recording.duration > longest) {
          longest = recording.duration;
        }
      });
      return (longest / 60).toFixed(2);
    } else {
      return 0;
    }
  };

  const totalTime = () => {
    let durationArray = [];
    if (recordings && recordings.length > 0) {
      recordings.map((recording) => {
        durationArray.push(recording.duration);
      });
    }
    if (durationArray.length > 0) {
      let total = durationArray.reduce((total, amount) => total + amount);
      return (total / 60).toFixed(2);
    } else {
      return 0;
    }
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
    let d = new Date(dateTime);
    let hrs = d.getHours();
    let mins = d.getMinutes();
    if (hrs < 12) {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let time = hrs + ":" + mins + " AM";
      return time;
    } else if (hrs < 13 && mins < 60) {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let time = hrs + ":" + mins + " PM";
      return time;
    } else {
      if (mins < 10) {
        mins = "0" + mins;
      }
      let PMhrs = hrs - 12;
      let time = PMhrs + ":" + mins + " PM";
      return time;
    }
  };

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
    return monthData;
  };

  const normalizeMonthData = (mood) => {
    let January = { x: "Jan", y: 0 };
    let February = { x: "Feb", y: 0 };
    let March = { x: "Mar", y: 0 };
    let April = { x: "Apr", y: 0 };
    let May = { x: "May", y: 0 };
    let June = { x: "Jun", y: 0 };
    let July = { x: "Jul", y: 0 };
    let August = { x: "Aug", y: 0 };
    let September = { x: "Sep", y: 0 };
    let October = { x: "Oct", y: 0 };
    let November = { x: "Nov", y: 0 };
    let December = { x: "Dec", y: 0 };
    grabMonth().map((recording) => {
      if (recording.month == 1 && recording.mood == mood) {
        January.y = January.y + 1;
      } else if (recording.month == 2 && recording.mood == mood) {
        February.y = February.y + 1;
      } else if (recording.month == 3 && recording.mood == mood) {
        March.y = March.y + 1;
      } else if (recording.month == 4 && recording.mood == mood) {
        April.y = April.y + 1;
      } else if (recording.month == 5 && recording.mood == mood) {
        May.y = May.y + 1;
      } else if (recording.month == 6 && recording.mood == mood) {
        June.y = June.y + 1;
      } else if (recording.month == 7 && recording.mood == mood) {
        July.y = July.y + 1;
      } else if (recording.month == 8 && recording.mood == mood) {
        August.y = August.y + 1;
      } else if (recording.month == 9 && recording.mood == mood) {
        September.y = September.y + 1;
      } else if (recording.month == 10 && recording.mood == mood) {
        October.y = October.y + 1;
      } else if (recording.month == 11 && recording.mood == mood) {
        November.y = November.y + 1;
      } else if (recording.month == 12 && recording.mood == mood) {
        December.y = December.y + 1;
      }
    });
    return [
      January,
      February,
      March,
      April,
      May,
      June,
      July,
      August,
      September,
      October,
      November,
      December,
    ];
  };

  const normalizeLogsData = () => {
    if (logData.length > 0) {
      return logData.map((recording) => {
        if (photos && photos.length > 0) {
          // console.log(recording)
          // console.log(photos)
          let filteredPhotos = photos.filter(
            (p) => p.recording_id == recording.id
          );
          let photo = filteredPhotos[0];
          // console.log(photo)
          let time = formatTime(recording.created_at);
          let length = (recording.duration / 60).toFixed(2);
          if (filteredPhotos.length > 0) {
            let renderPhotos = filteredPhotos.map((photo) => {
              return (
                <img
                  src={photo.pointer}
                  style={{
                    maxHeight: "5rem",
                    marginBottom: ".35rem",
                    float: "center",
                  }}
                />
              );
            });
            return (
              <div>
                <h3>{recording.title}</h3>
                <p>
                  <b>Length: </b>
                  {length} minutes
                </p>
                <p>
                  <b>Mood: </b>
                  {moodImage(recording.mood)}
                </p>
                <p>
                  <b>Notes: </b>
                  {recording.notes}
                </p>
                <br />
                {renderPhotos}
                <br />
                <audio
                  src={recording.pointer}
                  controls
                  style={{ height: "2rem", marginTop: "1rem" }}
                />
                {/* <VocalButton
                  onClick={() => handleModal(recording, filteredPhotos)}
                >
                  View Recording
                </VocalButton> */}
              </div>
            );
          } else {
            return (
              <div>
                <h3>{recording.title}</h3>
                <p>Length: {length} minutes</p>
                <p>Mood: {moodImage(recording.mood)}</p>
                <p>Notes: {recording.notes}</p>
                <audio
                  src={recording.pointer}
                  controls
                  style={{ height: "2rem", margin: "auto" }}
                />
                {/* <VocalButton
                  onClick={() => handleModal(recording, filteredPhotos)}
                >
                  View Recording
                </VocalButton> */}
              </div>
            );
          }
        } else {
          let length = recording.duration.toFixed(0);
          return (
            <div>
              <h3>{recording.title}</h3>
              <p>Length: {length} minutes</p>
              <p>Mood: {moodImage(recording.mood)}</p>
              <p>Notes: {recording.notes}</p>
              <audio
                src={recording.pointer}
                controls
                style={{ height: "2rem", margin: "auto" }}
              />
              <br />
              {/* <VocalButton onClick={() => handleModal(recording)}>
                View Recording
              </VocalButton> */}
            </div>
          );
        }
      });
    }
  };

  const LogTitles = () => {
    if (logData.length > 0) {
      return logData.map((recording) => {
        let time = formatTime(recording.created_at);
        return {
          title: `${time}`,
        };
      });
    }
  };

  const handleModal = (singleRecording, filteredPhotos) => {
    setRecording(singleRecording);
    setRecordingPhotos(filteredPhotos);
    setRecordingShow(true);
  };

  const displayModal = (singleRecording) => {
    return (
      <DailyLogModal
        recording={singleRecording}
        show={recordingShow}
        setShow={setRecordingShow}
        formatDate={formatDate}
        formatTime={formatTime}
        images={recordingPhotos}
      />
    );
  };

  const moodImage = (mood) => {
    if (mood == 1) {
      return (
        <img
          style={{
            height: "3rem",
            borderRadius: "1.5rem",
            marginRight: ".5rem",
          }}
          src={one}
        />
      );
    }
    if (mood == 2) {
      return (
        <img
          style={{
            height: "3rem",
            borderRadius: "1.5rem",
            marginRight: ".5rem",
          }}
          src={two}
        />
      );
    }
    if (mood == 3) {
      return (
        <img
          style={{
            height: "3rem",
            borderRadius: "1.5rem",
            marginRight: ".5rem",
          }}
          src={three}
        />
      );
    }
    if (mood == 4) {
      return (
        <img
          style={{
            height: "3rem",
            borderRadius: "1.5rem",
            marginRight: ".5rem",
          }}
          src={four}
        />
      );
    }
    if (mood == 5) {
      return (
        <img
          style={{
            height: "3rem",
            borderRadius: "1.5rem",
            marginRight: ".5rem",
          }}
          src={five}
        />
      );
    }
  };

  return (
    <>
      <Container>
        <VocalHeader style={{ marginTop: "5rem", marginBottom: "3rem" }}>
          Activity
        </VocalHeader>
        <Row
          md={1}
          lg={3}
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "2rem",
            marginBottom: "3rem",
          }}
        >
          <Col style={{ display: "flex", justifyContent: "space-around" }}>
            <StatCard>
              <Card.Img
                variant='top'
                src={lightbulb2}
                style={{
                  display: "block",
                  maxWidth: "7rem",
                  height: "auto",
                  width: "auto",
                  marginTop: "4rem",
                  marginBottom: "4rem",
                  marginLeft: "2rem",
                }}
              />
              <StatText as='h3' style={{ margin: "1rem" }}>
                Entries Saved: {recordings.length}
              </StatText>
            </StatCard>
          </Col>
          <Col style={{ display: "flex", justifyContent: "space-around" }}>
            <StatCard
              style={{ backgroundColor: `${ActionColor}`, color: "white" }}
            >
              <Card.Img
                variant='top'
                src={stopwatch3}
                style={{
                  display: "block",
                  maxWidth: "7rem",
                  height: "auto",
                  width: "auto",
                  marginTop: "4rem",
                  marginBottom: "4rem",
                  marginLeft: "2.5rem",
                }}
              />
              <StatText as='h3' style={{ margin: "1rem" }}>
                Total time recorded: {totalTime()} minutes
              </StatText>
            </StatCard>
          </Col>
          <Col style={{ display: "flex", justifyContent: "space-around" }}>
            <StatCard
              style={{ backgroundColor: `${SecondaryColor}`, color: "white" }}
            >
              <Card.Img
                variant='top'
                src={clock2}
                style={{
                  display: "block",
                  maxWidth: "7rem",
                  height: "auto",
                  width: "auto",
                  marginTop: "4rem",
                  marginBottom: "4rem",
                  marginLeft: "2rem",
                }}
              />
              <StatText as='h3' style={{ margin: "1rem" }}>
                Longest entry: {longestRecording()} minutes
              </StatText>
            </StatCard>
          </Col>
        </Row>

        {logData.length > 1 && (
          <GraphCard>
            <h2 style={{ margin: "3rem" }}>Daily Log</h2>
            <div
              style={{ height: "500px", width: "100%", paddingTop: "1.5rem" }}
            >
              <Chrono
                hideControls
                cardPositionHorizontal='Bottom'
                items={LogTitles()}
                mode='HORIZONTAL'
                theme={{
                  primary: `white`,
                  secondary: `${PrimaryColor}`,
                  cardBgColor: `${PrimaryColor}`,
                  cardForeColor: "white",
                  titleColor: `white`,
                }}
              >
                {normalizeLogsData()}
              </Chrono>
            </div>
          </GraphCard>
        )}
        {recordingShow && displayModal(recording)}
        <GraphCard style={{ marginBottom: "3rem" }}>
          <h2 style={{ margin: "3rem" }}>Annual Activity</h2>
          <div style={{ width: "100%", height: "20rem", marginBottom: "50px" }}>
            {/* to work on this calendar use: https://nivo.rocks/calendar/ */}
            <ResponsiveCalendar
              isInteractive={false}
              data={changeData()}
              from={new Date(new Date().getFullYear(), 0, 1)}
              to='2022-12-31'
              emptyColor='#eeeeee'
              textColor='#ffffff'
              colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
              theme={{
                textColor: "white",
                fontSize: "1rem",
                backgroundColor: `${PrimaryColor}`,
              }}
              margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
              yearSpacing={40}
              // monthSpacing={10}
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
        <GraphCard style={{ paddingBottom: "75px" }}>
          <h2 style={{ margin: "3rem" }}>Entries by Mood</h2>
          <div style={{ marginRight: "5rem" }}>
            <img
              style={{
                width: "20%",
                // minWidth: "15rem",
                height: "auto",
                borderRadius: "1.5rem",
                marginLeft: "80%",
                marginBottom: "-5rem",
              }}
              src={label}
            />
            <FlexibleWidthXYPlot
              yDomain={[0, 32]}
              style={{ margin: "3.5rem", marginTop: "0rem" }}
              height={600}
              stackBy='y'
              xType='ordinal'
            >
              {/* <DiscreteColorLegend
                style={{
                  // position: "relative",
                  marginLeft: "70%",
                  marginTop: "-50rem",
                }}
                width={100}
                height={100}
                orientation='horizontal'
                items={[
                  {
                    title: (
                      <img
                        style={{
                          width: "100%",
                          minWidth: "15rem",
                          height: "auto",
                          borderRadius: "1.5rem",
                          marginRight: "10%",
                          marginBottom: "0.25rem",
                        }}
                        src={label}
                      />
                    ),
                    color: `${SecondaryColor}`,
                  },
                ]}
              /> */}
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis
                // hideTicks
                title='Month'
                tickSize={0}
                style={{
                  line: { stroke: "gray" },
                  text: { stroke: "none", fill: "white" },
                  title: { fill: "white" },
                }}
              />
              <YAxis
                title='Number of Entries'
                tickSize={0}
                style={{
                  line: { stroke: "gray" },
                  ticks: { stroke: "#ADDDE1" },
                  text: { stroke: "none", fill: "white", fontWeight: 600 },
                  title: { fill: "white" },
                }}
              />
              <BarSeries
                cluster='mood1'
                color='#4287f5'
                data={normalizeMonthData(1)}
              />
              <BarSeries
                cluster='mood2'
                color='#40de50'
                data={normalizeMonthData(2)}
              />
              <BarSeries
                cluster='mood3'
                color='#d9de40'
                data={normalizeMonthData(3)}
              />
              <BarSeries
                cluster='mood4'
                color='#ffad33'
                data={normalizeMonthData(4)}
              />
              <BarSeries
                cluster='mood5'
                color='#ff3399'
                data={normalizeMonthData(5)}
              />
            </FlexibleWidthXYPlot>
          </div>
        </GraphCard>
      </Container>
    </>
  );
};

export default Activities;
