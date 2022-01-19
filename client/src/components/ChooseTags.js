import {useState, useEffect} from 'react'
import axios from "axios";
import DropdownChecklist from "./DropdownChecklist"
const ChooseTags = () => {
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])
    const [showCreateTag, setShowCreateTag] = useState(false)
    const [newTag, setNewTag] = useState("")

    useEffect(()=>{
        getTags()
    }, [])

    useEffect(()=>{
       console.log("sel tags: " + chosenTags)
    }, [chosenTags])

    const getTags = async () => {
    try{
      let res = await axios.get(`api/tags`)
      setTags(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
      e.preventDefault()
      setNewTag(e.target.value)
  }
  const createTag = async (e) => {
      e.preventDefault()
      setTags([...tags, {tag_text: newTag}])
      setShowCreateTag(false)
      setNewTag("")
  }
    return (
      <div>
            {showCreateTag ?
                <div>
                  <input onChange={handleChange}></input>
                  <button onClick={createTag} style={{borderRadius: "10%", borderWidth: "0.2px"}}>✓</button>
                  <button onClick={()=>{setShowCreateTag(false)}} style={{borderRadius: "10%", borderWidth: "0.2px"}}>X</button>
                </div>
            :
                <div>
                  <DropdownChecklist tag="Tags" setState={setChosenTags} items={tags.map((t)=>{
                      return t.tag_text
                    })}/>

                  <button onClick={()=>{setShowCreateTag(true)}} style={{borderRadius: "10%", borderWidth: "0.2px"}}>+</button>
                </div>
            } 
      </div>
    )
} 
export default ChooseTags