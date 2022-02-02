import React from "react";
import Recorder from "../components/Recorder";
import "../StylesFolder/Styles_Landing.css";
import {
  PrimaryColor,
  SecondaryColor,
  ActionColor,
  VocalHeader,
  VocalButton,
  ViewButton,
} from "../components/Styles.js";
import soundwaves from "../images/soundwavesBlue.jpeg";

const Home = (props) => {
  const { recording } = props;
  console.log(props);
  return (
    <div
      style={{
        backgroundColor: `${SecondaryColor}`,
        height: "44rem",
        marginTop: "5rem",
        marginLeft: "8rem",
        marginRight: "8rem",
        marginBottom: "5rem",
        borderRadius: "1.5rem",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "column",
          textAlign: "center",
          alignItems: "center",
          marginTop: "5rem",
          transform: "translate(0px, -25px)",
        }}
      >
        <img
          src={soundwaves}
          className='record'
          style={{
            width: "45%",
            maxWidth: "23rem",
            minWidth: "8rem",
            height: "auto",
            borderRadius: "50%",
            marginBottom: "2rem",
          }}
        />
        <div style={{}}>
          <Recorder />
        </div>
      </div>
    </div>
  );
};

export default Home;
