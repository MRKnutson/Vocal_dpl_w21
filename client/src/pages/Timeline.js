import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowRecording from "../components/ShowRecording";
import {
  Table,
  Button,
  ButtonToolbar,
  InputGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import {
  PrimaryColor,
  SecondaryColor,
  ActionColor,
  VocalHeader,
  VocalButton,
} from "../components/Styles.js";
import Recording from "../components/Recording";
import SearchBar from "../components/SearchBar";
import RenderJson from "../components/RenderJson";

const Timeline = () => {
  const [recordings, setRecordings] = useState([]);
  const [tags, setTags] = useState([]);
  const [showRecordingID, setShowRecordingID] = useState(null);
  const [tagChoice, setTagChoice] = useState(null);
  const [images, setImages] = useState(null);
  const [search, setSearch] = useState(null);
  const [filteredRecordings, setFilteredRecordings] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log("showRecordingID: " + showRecordingID);
  // }, [showRecordingID]);

  const getRecordings = async () => {
    try {
      let response = await axios.get("/api/recordings");
      setRecordings(response.data.reverse());
      setFilteredRecordings(response.data);
    } catch (error) {
      alert("error occured in getRecordings");
    }
  };

  const getImages = async () => {
    try {
      let response = await axios.get("/api/images");
      setImages(response.data);
    } catch (error) {
      alert("error occured in getImages");
    }
  };

  const getTags = async () => {
    try {
      let response = await axios.get("/api/tags");
      setTags(response.data);
    } catch (error) {
      alert("error occured in getTags");
    }
  };

  const getData = () => {
    getImages();
    getRecordings();
    getTags();
  };

  const renderRecordings = (recordingsToRender) => {
    let recs = recordingsToRender;
    if (tagChoice) {
      recs = recordingsToRender.filter((r) => r.tag_id == tagChoice);
    }
    if (recs.length > 0) {
      return recs.map((recording) => {
        return (
          <Recording
            images={filterImages(recording.id)}
            setImages={setImages}
            recording={recording}
            showRecording={() => {
              setShowRecordingID(recording.id);
            }}
            tags={tags.filter((t) => t.recording_id === recording.id)}
          />
        );
      });
    }
  };
  // this renders the possible tags the person has
  const renderSearchTags = () => {
    let count = 0;
    return recordings.map((r) => {
      // Change this to display the name of the tag once it has real data
      count++;
      return (
        <Dropdown.Item key={r.tag_id} eventKey={`${r.tag_id}`}>
          {r.tag_id}
        </Dropdown.Item>
      );
    });
  };

  const handleSelection = (e) => {
    setTagChoice(e);
  };

  const filterImages = (id) => {
    if (images) {
      let filteredImages = images.filter((image) => {
        return image.recording_id == id;
      });
      if (filteredImages.length > 0) {
        return filteredImages;
      } else return [];
    }
    return [];
  };

  const filterRecordings = (search) => {
    let allRecordings = recordings;
    if (allRecordings.length > 0) {
      let mappedRecordings = allRecordings.map((recording) => {
        if (recording.title.includes(search)) {
          return recording;
        }
      });
      let filteredRecordings = allRecordings.filter((f) =>
        f.title.includes(search)
      );
      setFilteredRecordings(filteredRecordings);
      setSearch(search);
    }
  };

  return (
    <div>
      <VocalHeader style={{ margin: "3rem" }}>My Journal Entries</VocalHeader>
      <InputGroup
        style={{ width: "200px", float: "right", marginBottom: "10px" }}
      >
        <DropdownButton
          onSelect={(choice) => handleSelection(choice)}
          title='Search Tags'
        >
          {renderSearchTags()}
          <Dropdown.Divider />
          <Dropdown.Item eventKey='All'>View All Recordings</Dropdown.Item>
        </DropdownButton>
      </InputGroup>
      <SearchBar input={search} filterRecordings={filterRecordings} />
      {showRecordingID && (
        <ShowRecording
          recording={recordings.find((r) => r.id === showRecordingID)}
          tags={tags.filter((t) => t.recording_id === showRecordingID)}
          setImages={setImages}
          allImages={images}
          images={filterImages(showRecordingID)}
          handleClose={() => {
            setShowRecordingID(null);
          }}
          recordings={recordings}
          setRecordings={setRecordings}
          getData={getData}
        />
      )}
      <br /> <br />
      {renderRecordings(filteredRecordings)}
    </div>
  );
};

export default Timeline;
