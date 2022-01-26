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
import DropdownChecklist from "../components/DropdownChecklist";

const Timeline = () => {
  const [recordings, setRecordings] = useState([]);
  const [tags, setTags] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [showRecordingID, setShowRecordingID] = useState(null);
  const [chosenTags, setChosenTags] = useState([]);
  const [images, setImages] = useState(null);
  const [search, setSearch] = useState(null);
  const [filteredRecordings, setFilteredRecordings] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //   useEffect(() => {
  //   console.log("chosen: " + chosenTags);
  // }, [chosenTags]);

  // useEffect(() => {
  //   console.log("tags: " + tags);
  // }, [tags]);

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
      let unique = [];
      response.data.forEach((t) => {
        if (unique.map((ut) => ut.tag_text).includes(t.tag_text)) {
          console.log("duplicate skipped");
        } else {
          unique.push(t);
        }
      });
      setUniqueTags(unique);
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
    let searchTags = tags.filter((t) => chosenTags.includes(t.tag_text));
    // console.log("searchTags: " + searchTags)
    let taggedRecIds = searchTags.map((t) => t.recording_id);
    if (chosenTags.length > 0) {
      recs = recordingsToRender.filter((r) => taggedRecIds.includes(r.id));
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
    setChosenTags(e);
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
    let casedSearch = search.toLowerCase();
    let allRecordings = recordings;
    if (allRecordings.length > 0) {
      let filteredRecordings = allRecordings.filter((f) =>
        f.title.toLowerCase().includes(casedSearch)
      );
      setFilteredRecordings(filteredRecordings);
      setSearch(casedSearch);
    }
  };

  return (
    <div>
      <VocalHeader style={{ margin: "3rem" }}>My Journal Entries</VocalHeader>
      <DropdownChecklist
        tag='Tags'
        setState={setChosenTags}
        selItems={chosenTags}
        items={uniqueTags.map((t) => {
          return t.tag_text;
        })}
      />
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
