import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { ActionColor, SecondaryColor } from "./Styles";

const DropdownChecklist = (props) => {
  // const [selItems, setSelItems] = useState(props.selItems);
  // const [items, setItems] = useState(props.items);
  // useEffect(()=>{
  //     props.setState(selItems)
  // }, [selItems])

  return (
    // <div>
    //   {/* <p style={{ color: "#FFFFFF" }}>Select Tag(s): </p> */}
    <FormControl
      sx={{
        width: "20rem",
        height: "3.5rem",
        float: "right",
        marginRight: "1rem",
        backgroundColor: `${ActionColor}`,
        borderRadius: "0.75rem",
        color: "#FFFFFF",
      }}
    >
      {
        <InputLabel
          id='demo-multiple-checkbox-label'
          //   color='secondary'
          style={{ color: "#FFFFFF" }}
        >
          Select Tag(s)
        </InputLabel>
      }
      <Select
        classes={"MuiSelect-icon"}
        // IconComponent={"none"}
        labelId='demo-multiple-checkbox-label'
        label='Select Tag(s)'
        id='demo-multiple-checkbox'
        multiple
        value={props.selItems}
        onChange={(e) => {
          props.setState(e.target.value);
        }}
        input={<OutlinedInput label='Tag' />}
        renderValue={(selected) => selected.join(", ")}
      >
        {props.items.map((item) => (
          <MenuItem
            key={item}
            value={item}
            name={item}
            // style={{ backgroundColor: `${ActionColor}`, color: "#FFFFFF" }}
          >
            <Checkbox
              checked={props.selItems.indexOf(item) > -1}
              //   style={{ color: "white" }}
            />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    // </div>
  );
};
export default DropdownChecklist;
