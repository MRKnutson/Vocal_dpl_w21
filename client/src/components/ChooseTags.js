import {useState, useEffect} from 'react'
import axios from "axios";
import DropdownChecklist from "./DropdownChecklist"
import { ViewButton, VocalButton, SecondaryColor, PrimaryColor, ActionColor } from './Styles';
const ChooseTags = (props) => {
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])
    const [showCreateTag, setShowCreateTag] = useState(false)
    const [newTag, setNewTag] = useState("")

    useEffect(()=>{
        getTags()
    }, [])

    useEffect(()=>{
       props.selectTags(chosenTags.map((ct)=>{
         if(ct.tag_text){
           return ct
         } else {
           return {tag_text: ct}
         }
       }))
    }, [chosenTags])

    const getTags = async () => {
    try{
      let res = await axios.get(`api/tags`)
      let tagLog = []
      let distinctTags = res.data.filter((t)=>{
        let keep = !tagLog.includes(t.tag_text)
        tagLog.push(t.tag_text)
        return keep
      })
      console.log("tags gotten")
      setTags(distinctTags)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
      e.preventDefault()
      console.log("change handled")
      setNewTag(e.target.value)
  }

  const createTag = async (e) => {
      e.preventDefault()
      setTags([...tags, {tag_text: newTag}])
      setChosenTags([...chosenTags, newTag])
      setShowCreateTag(false)
      setNewTag("")
  }

  const preventEnterSubmit = (event) => {
    if (event.keyCode === 13) { //13 is the key code for Enter
      event.preventDefault()
      //Here you can even write the logic to select the value from the drop down or something.
    }
  }
  
    return (
      <div>
            {showCreateTag ?
                <div style={{backgroundColor: `${SecondaryColor}`}}>
                  <label style={{marginRight:".8rem"}}>Enter new tag:</label>
                  <input onKeyDown={preventEnterSubmit} onChange={handleChange} style={{border:"none", borderRadius:"0.3rem"}}></input>
                  {newTag && <ViewButton onClick={createTag} style={{borderRadius: ".4rem", marginRight:".5rem", marginLeft:".5rem", width:"2.5rem"}}>✓</ViewButton>}
                  <ViewButton onClick={()=>{
                    setNewTag("")
                    setShowCreateTag(false)
                  }} style={{borderRadius: ".4rem", width:"2.5rem"}}>X</ViewButton>
                </div>
            :
                <div style={{marginTop:"1.5rem"}}>
                  {tags.length > 0 && <DropdownChecklist tag="Select a Tag" setState={setChosenTags} selItems={chosenTags} items={tags.map((t)=>{
                      return t.tag_text
                    })} />}
                  <ViewButton onClick={()=>{setShowCreateTag(true)}} style={{borderRadius: "0.25rem", borderWidth: "0.05rem", marginTop:"0.5rem"}}>Add New Tag</ViewButton>
                </div>
            } 
      </div>
    )
} 
//
export default ChooseTags