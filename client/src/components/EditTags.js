import {useState, useEffect} from 'react'
import axios from "axios";
import DropdownChecklist from "./DropdownChecklist"
const ChooseTags = (props) => {

  const formatTags = (tagArr) => {
    return tagArr.map((t)=>{
         if(t.tag_text){
           return t
         } else {
           return {tag_text: t}
         }
       })
  }
    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState(formatTags(props.chosenTags))
    const [showCreateTag, setShowCreateTag] = useState(false)
    const [newTag, setNewTag] = useState("")

    useEffect(()=>{
        getTags()
    }, [])

    useEffect(()=>{
       props.selectTags(formatTags(chosenTags))
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
      setTags(distinctTags)
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
      setTags(formatTags([...tags, {tag_text: newTag}]))
      setChosenTags(formatTags([...chosenTags, newTag]))
      setShowCreateTag(false)
      setNewTag("")
  }

  const selectTags = (selTags) => {
    setChosenTags(formatTags(selTags))
  }


  
  
    return (
      <div>
            {showCreateTag ?
                <div>
                  <input onChange={handleChange}></input>
                  {newTag && <button type="button" onClick={createTag} style={{borderRadius: "10%", borderWidth: "0.2px"}}>✓</button>}
                  <button type="button" onClick={()=>{
                    setShowCreateTag(false)
                    setNewTag("")
                  }} style={{borderRadius: "10%", borderWidth: "0.2px"}}>X</button>
                </div>
            :
                <div>
                  <DropdownChecklist tag="Tags" setState={selectTags} selItems={chosenTags.map((t)=>{
                      return t.tag_text
                    })} items={tags.map((t)=>{
                      return t.tag_text
                    })}/>
                  <button onClick={()=>{setShowCreateTag(true)}} style={{borderRadius: "10%", borderWidth: "0.2px"}}>+</button>
                </div>
            } 
      </div>
    )
} 
export default ChooseTags