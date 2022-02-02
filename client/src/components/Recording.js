import { useState } from "react";
import {
  PrimaryColor,
  ActionColor,
  VocalHeader,
  VocalButton,
} from "../components/Styles.js";

import {
  HoverImage,
  SecondaryColor,
  ViewButton,
} from "../components/Styles.js";
import ShowImage from "./ShowImage.js";
import one from "../images/1smiley.png";
import two from "../images/2smiley.png";
import three from "../images/3smiley.png";
import four from "../images/4smiley.png";
import five from "../images/5smiley.png";

const Recording = (props) => {
  const { recording, showRecording, tags, images, setImages } = props;
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const deletable = false;

  const deleteImage = (id) => {
    return null;
  };

  const handleModal = (i) => {
    setModalImage(i);
    setShowImageModal(true);
  };

  const renderImages = () => {
    if (images && images.length > 0) {
      return images.map((image) => {
        return (
          <>
            <HoverImage
              onClick={() => handleModal(image)}
              key={recording.id}
              src={image.pointer}
              alt='image'
            />
            {modalImage && (
              <ShowImage
                setShowImageModal={setShowImageModal}
                showImageModal={showImageModal}
                image={modalImage}
                imagePointer={image.pointer}
                deleteImage={deleteImage}
                deletable={deletable}
              />
            )}
          </>
        );
      });
    }
  };

  // console.log(recording.mood);

  const moodImage=()=> {
    if (recording.mood==1){
      return <img style={{height:"2.8rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={one}/>
    } if (recording.mood==2) {
      return <img style={{height:"2.8rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={two}/>
    } if (recording.mood==3) {
      return <img style={{height:"2.8rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={three}/>
    } if (recording.mood==4) {
      return <img style={{height:"2.8rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={four}/>
    } if (recording.mood==5) {
      return <img style={{height:"2.8rem", borderRadius:"1.5rem", marginRight:".5rem"}} src={five}/>
    }
  };

  return (
    <div
      style={{
        backgroundColor: `${SecondaryColor}`,
        borderRadius: "1rem",
        marginRight: "8rem",
        marginBottom:"1rem",
        marginLeft: "8rem",
        marginTop:"1.5rem",
        padding: "2rem",
      }}
    >
      <h2 style={{color:"white", marginBottom:"2rem", fontWeight:"700"}}>{recording.title}</h2>
      <p style={{ color: "white" }}>
        {recording.duration > 60 && Math.floor(recording.duration / 60)
          .toString()
          .substring(0, recording.duration.toString().indexOf(".")) + " minute"}{Math.floor(recording.duration / 60) > 1 && "s"}
         {" " + (recording.duration % 60)
          .toString()
          .substring(0, (recording.duration % 60).toString().indexOf("."))} second{recording.duration % 60 > 1 && "s"}
      </p>{" "}
      {/*limiting to 2 decimal digits */}
      <p style={{ color: "white" }}>
        {/* <b>Date:{" "}</b> */}
        {recording.created_at.substring(0, recording.created_at.indexOf("T"))}
      </p>
      {tags.length > 0 && <p style={{ color: "white" }}>
        <b>Tags: </b>{tags.map((t) => t.tag_text).join(", ")}
      </p>} 
      {recording.mood>0 && <p style={{ color: "white" }}>
        <b>Mood: </b>{moodImage()}
      </p>}
      {images && images.length > 0 && renderImages()}
      <br />
      <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-end"}}>
      <ViewButton onClick={showRecording}>View Details</ViewButton>
      <audio controls id='background_music' src={recording.pointer} />
      </div>
    </div>
  );
};

export default Recording;
