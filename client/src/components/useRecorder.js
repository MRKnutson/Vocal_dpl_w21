import { useEffect, useState } from "react";

const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [blobURL, setBlobURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);


  useEffect(()=>{
    if (recorder === null) {
      requestRecorder().then(setRecorder, console.error);
    }
  }, [])
  useEffect(() => {
    // // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if(recorder){
      if (isRecording) {
        recorder.start();
      } else {
        if(recorder.state!="inactive")
        recorder.stop();
      }
    }
    

    // Obtain the audio when ready.
    const handleData = e => {
      setAudioURL(e.data);
      setBlobURL(URL.createObjectURL(e.data));
    };
   if(recorder){
      recorder.addEventListener("dataavailable", handleData);
      return () => recorder.removeEventListener("dataavailable", handleData);
   }
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const clearRecording = () => {
      setAudioURL(null)
      setBlobURL(null);
      console.log("recording cleared")
  }

  return [audioURL, blobURL, isRecording, startRecording, stopRecording, clearRecording, recorder];
};

async function requestRecorder() {

    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch(err) {
      console.log("mic not found!")
    }
  
    return new MediaRecorder(stream);
  
}
export default useRecorder;
