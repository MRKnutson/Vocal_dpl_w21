import {useState} from "react"
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader, VocalButton} from '../components/Styles.js'
import Play from "../images/Play.png"
import Pause from "../images/Pause.png"


const Recording = (props) => {
    const {recording, showRecording, tags, images} = props
    const [playing, setPlaying] = useState(false)


    const renderImages = () => {
        if (images && images.length > 0) {
            return images.map((image) => {
               return <img key={recording.id} src={image.pointer} alt="image" style={{width:"100px"}}/>
            })
        }
    }

    // var mPlayer = document.getElementById("background_music"); 
    // var mPlayAction = document.getElementById("playbutton"); 


    // function playAudio() { 
    //     mPlayer.play(); 
    //     setPlaying(true);
    //     mPlayAction.src = {Pause};
    //     // document.getElementsByTagName('audio').addEventListener('playing',()=>setPlaying(false),true);
    // } 

    // function pauseAudio() { 
    //     mPlayer.pause();
    //     setPlaying(false);
    //     mPlayAction.src = {Play};
    // } 
    // function HandleAudio(){
    // if(playing == true){
    //     //Playing already Pause it
    //     pauseAudio();
    // }else{
    //     //Play the music
    //     playAudio();
    // } 
    // }
console.log(recording.pointer)

    return (
        <div style={{backgroundColor:`${SecondaryColor}`, margin:"1rem", borderRadius:"1rem", padding:"2rem"}}>
            <h4 onClick = {showRecording}style={{color:"white"}}>{recording.title}</h4>
            <p style={{color:"white"}}>Duration: {recording.duration.toString().substring(0, recording.duration.toString().indexOf(".")+3)}</p> {/*limiting to 2 decimal digits */}
            <p style={{color:"white"}}>Date: {recording.created_at.substring(0, recording.created_at.indexOf("T"))}</p>
            <p style={{color:"white"}}>Tags: {tags.map((t)=> t.tag_text)}</p>
            {images && images.length>0 && renderImages()}
            <br/>
            {/* {!playing && <img src={Play} alt="play recording" id="playbutton" onClick={HandleAudio} style={{height:"100px"}}/>} */}
            {/* {playing && <img src={Pause} alt="pause recording" id="playbutton" onClick={HandleAudio} style = {{height:"100px"}}/>} */}
            {/* <audio id="background_music" src = {recording.pointer}/> */}
            {/* <img src = {Play} alt = "play recording"/> */}
            <audio controls src = {recording.pointer}/>
        </div>
        )
}
export default Recording