import * as Tone from "tone";
import React, { useState, useEffect } from "react";
// import {LinearProgress, Box} from '@mui/material'
// import soundwaves from "../images/transparentSoundwaves.png";
import ProgressBar from "@ramonak/react-progress-bar";
const AudioMeter = () => {
  const [level, setLevel] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const meter = new Tone.Meter({ normalRange: true });
  const mic = new Tone.UserMedia().connect(meter);

  useEffect(() => {
    Tone.start();
    mic
      .open()
      .then(() => {
        console.log("mic open");
        setIntervalId(setInterval(() => setLevel(meter.getValue()), 25));
      })
      .catch((e) => {
        console.log("mic not open");
      });
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div style={{ display: "block", marginBottom: "50px" }}>
      {/* <LinearProgress sx={{ height: "50px", transform: "rotate(270deg) translate(320px, 225px)" }} variant="determinate" value={Math.pow(level, 0.2) * 120}/> */}
      <ProgressBar
        completed={Math.pow(level, 0.2) * 120}
        isLabelVisible={false}
        transitionDuration={"0.05s"}
        baseBgColor={"white"}
        bgColor={"lightGrey"}
        //you can name these classes and put css on them if you want
        // className="wrapper"
        // barContainerClassName="container"
        // completedClassName="barCompleted"
        // labelClassName="label"
      />
    </div>
  );
};
export default AudioMeter;
