import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { SecondaryColor, VocalHeader, ViewButton } from "./Styles";

const ShowImage = (props) => {
  const {
    showImageModal,
    setShowImageModal,
    deleteImage,
    image,
    imagePointer,
  } = props;
  const [deletable, setDeletable] = useState(
    props.deletable === false ? false : true
  );
  console.log(imagePointer);
  console.log(image);
  console.log(image.photo_id);
  const handleClose = () => setShowImageModal(false);

  const handleDelete = () => {
    deleteImage(image.photo_id);
    setShowImageModal(false);
  };

  // {deletable && (

  return (
    <>
      <Modal show={showImageModal} onHide={handleClose} centered={true}>
      {!deletable && ( <Modal.Body style={{padding:"2rem", backgroundColor: `${SecondaryColor}`, borderRadius:"1.5rem", boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"}}>
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", flexDirection:"column"}}>
            <VocalHeader style={{marginBottom:"2rem", margin:"auto", paddingBottom:"1rem"}} closebutton>View Image</VocalHeader>
            <img src={image.pointer} alt='image' style={{maxWidth: "20rem", border:".2rem solid white", borderRadius:".3rem", margin:"auto"}} />
            <ViewButton style={{marginTop:"2rem"}} variant='secondary' onClick={handleClose}>
              Cancel
            </ViewButton>
          </div>
          </Modal.Body>
        )}
        {deletable && ( <Modal.Body style={{ padding:"2rem", backgroundColor: `${SecondaryColor}`, display:"flex", flexWrap:"wrap", justifyContent:"center", borderRadius:"1.5rem", boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px"}}>
          <VocalHeader style={{marginBottom:"2rem"}} closebutton>View Image</VocalHeader>
          <img src={image.pointer} alt='image' style={{ maxWidth: "20rem", border:".2rem solid white", borderRadius:".3rem"}} />
            <br/>
          <div style={{margin:"1rem"}}>
          <ViewButton style={{marginRight:"1rem"}} variant='secondary' onClick={handleClose}>
            Cancel
          </ViewButton>
          
            <ViewButton variant='primary' onClick={handleDelete}>
              Delete
            </ViewButton>
          </div>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default ShowImage;


