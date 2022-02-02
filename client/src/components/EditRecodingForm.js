import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ViewButton } from "./Styles";
import EditTags from "./EditTags";
import ShowImage from "./ShowImage.js";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";
const EditRecordingForm = (props) => {
  const {
    showEdit,
    setShowEdit,
    recording,
    setRecording,
    recordings,
    setRecordings,
    getData,
  } = props;
  const [title, setTitle] = useState(props.recording.title);
  const [notes, setNotes] = useState(props.recording.notes);
  const [mood, setMood] = useState(props.recording.mood);
  const [tags, setTags] = useState(props.tags);
  const [allTags, setAllTags] = useState([]);
  const [mood1Active, setMood1Active] = useState(false);
  const [mood2Active, setMood2Active] = useState(false);
  const [mood3Active, setMood3Active] = useState(false);
  const [mood4Active, setMood4Active] = useState(false);
  const [mood5Active, setMood5Active] = useState(false);

  useEffect(() => {
    getAllTags();
    activateMood();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedRecording = {
      ...recording,
      title: title,
      notes: notes,
      mood: mood,
    };

    try {
      clearTags();
      processTags(tags, recording.id);
      let response = await axios.put(
        `/api/recordings/${recording.id}`,
        updatedRecording
      );
      setRecording(response.data);
      updateRecordings(response.data);
      setShowEdit(!showEdit);
    } catch (err) {
      alert("error updating recording");
    }
    getData();
  };

  const activateMood = () => {
    if (mood == 1) {
      setMood1Active(true);
    }
    if (mood == 2) {
      setMood2Active(true);
    }
    if (mood == 3) {
      setMood3Active(true);
    }
    if (mood == 4) {
      setMood4Active(true);
    }
    if (mood == 5) {
      setMood5Active(true);
    }
  };

  const updateRecordings = (changedRecording) => {
    let updatedRecordings = recordings.map((r) =>
      r.id === changedRecording.id ? changedRecording : r
    );
    setRecordings(updatedRecordings);
  };

  const clearTags = async () => {
    await axios.get(`/api/recordings/${recording.id}/clear_tags`);
  };

  const connectTag = async (tag_id, rec_id) => {
    await axios.put(`/api/tags/${tag_id}`, { recording_id: rec_id });
  };
  const addTag = async (rec_id, text) => {
    await axios.post("/api/tags", { text: text, recording_id: rec_id });
  };
  const processTags = async (chosenTags, rec_id) => {
    chosenTags.forEach((ct) => {
      if (!allTags.map((t) => t.tag_text).includes(ct.tag_text)) {
        try {
          addTag(rec_id, ct.tag_text);
        } catch (err) {
          console.log("error creating tag: " + ct.tag_text, err);
        }
      } else {
        let tag_id = allTags.find((t) => t.tag_text === ct.tag_text).tag_id;
        connectTag(tag_id, rec_id);
      }
    });
  };

  const getAllTags = async () => {
    try {
      let res = await axios.get("/api/tags");
      setAllTags(res.data);
    } catch (err) {
      console.log("error getting tags: " + err);
    }
  };

  const selectMood = (e, value) => {
    e.preventDefault();
    setMood1Active(false);
    setMood2Active(false);
    setMood3Active(false);
    setMood4Active(false);
    setMood5Active(false);
    setMood(value);
    console.log(value);
    if (value == 1) {
      setMood1Active(true);
    }
    if (value == 2) {
      setMood2Active(true);
    }
    if (value == 3) {
      setMood3Active(true);
    }
    if (value == 4) {
      setMood4Active(true);
    }
    if (value == 5) {
      setMood5Active(true);
    }
  };

  const selectActive = (active) => {
    console.log(active);
    if (active == true) {
      return "mood-button-active";
    } else {
      return "mood-button";
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          defaultValue={title}
          maxLength={55}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as='textarea'
          maxLength={255}
          defaultValue={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <br />
        <div
          className='mood-div'
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: ".8rem" }}>Choose a Mood: </label>
          <input
            type='image'
            className={selectActive(mood1Active)}
            onClick={(e) => {
              selectMood(e, 1);
            }}
            style={{
              height: "2.8rem",
              borderRadius: "1.5rem",
              marginRight: "1rem",
            }}
            src={one}
          />
          <input
            type='image'
            className={selectActive(mood2Active)}
            onClick={(e) => {
              selectMood(e, 2);
            }}
            style={{
              height: "2.8rem",
              borderRadius: "1.5rem",
              marginRight: "1rem",
            }}
            src={two}
          />
          <input
            type='image'
            className={selectActive(mood3Active)}
            onClick={(e) => {
              selectMood(e, 3);
            }}
            style={{
              height: "2.8rem",
              borderRadius: "1.5rem",
              marginRight: "1rem",
            }}
            src={three}
          />
          <input
            type='image'
            className={selectActive(mood4Active)}
            onClick={(e) => {
              selectMood(e, 4);
            }}
            style={{
              height: "2.8rem",
              borderRadius: "1.5rem",
              marginRight: "1rem",
            }}
            src={four}
          />
          <input
            type='image'
            className={selectActive(mood5Active)}
            onClick={(e) => {
              selectMood(e, 5);
            }}
            style={{
              height: "2.8rem",
              borderRadius: "1.5rem",
              marginRight: "1rem",
            }}
            src={five}
          />
        </div>
        <br />
      </Form.Group>
      <EditTags selectTags={setTags} chosenTags={tags} />
      <ViewButton style={{display:"flex", margin:"auto",marginTop:".5rem", marginBottom:"-2rem"}} type='submit'>Submit Changes</ViewButton>
    </Form>
  );
};

export default EditRecordingForm;
