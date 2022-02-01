import { useState, useEffect } from "react";
import axios from "axios";
import DropdownChecklist from "./DropdownChecklist";
import { ViewButton } from "./Styles";
const ChooseTags = (props) => {
  const formatTags = (tagArr) => {
    return tagArr.map((t) => {
      if (t.tag_text) {
        return t;
      } else {
        return { tag_text: t };
      }
    });
  };
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState(formatTags(props.chosenTags));
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    props.selectTags(formatTags(chosenTags));
  }, [chosenTags]);

  const getTags = async () => {
    try {
      let res = await axios.get(`api/tags`);
      let tagLog = [];
      let distinctTags = res.data.filter((t) => {
        let keep = !tagLog.includes(t.tag_text);
        tagLog.push(t.tag_text);
        return keep;
      });
      setTags(distinctTags);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewTag(e.target.value);
  };
  const createTag = async (e) => {
    e.preventDefault();
    setTags(formatTags([...tags, { tag_text: newTag }]));
    setChosenTags(formatTags([...chosenTags, newTag]));
    setShowCreateTag(false);
    setNewTag("");
  };

  const selectTags = (selTags) => {
    setChosenTags(formatTags(selTags));
  };

  const preventEnterSubmit = (event) => {
    if (event.keyCode === 13) {
      //13 is the key code for Enter
      event.preventDefault();
      //Here you can even write the logic to select the value from the drop down or something.
    }
  };

  return (
    <div>
      {showCreateTag ? (
        <div>
          <input
            onKeyDown={preventEnterSubmit}
            onChange={handleChange}
            style={{
              height: "2.5rem",
              borderRadius: "0.25rem",
              marginBottom: "1.5rem",
            }}
          ></input>
          {newTag && (
            <ViewButton
              type='button'
              onClick={createTag}
              style={{ marginLeft: "0.2rem", width: "2.1rem" }}
            >
              ✓
            </ViewButton>
          )}
          <ViewButton
            type='button'
            onClick={() => {
              setShowCreateTag(false);
              setNewTag("");
            }}
            style={{ marginLeft: "0.2rem", width: "2.1rem" }}
          >
            X
          </ViewButton>
        </div>
      ) : (
        <div>
          <DropdownChecklist
            tag='Tags'
            setState={selectTags}
            selItems={chosenTags.map((t) => {
              return t.tag_text;
            })}
            items={tags.map((t) => {
              return t.tag_text;
            })}
          />
          <ViewButton
            onClick={() => {
              setShowCreateTag(true);
            }}
            style={{ marginBottom: "1rem" }}
          >
            Add New Tag
          </ViewButton>
        </div>
      )}
    </div>
  );
};
export default ChooseTags;
