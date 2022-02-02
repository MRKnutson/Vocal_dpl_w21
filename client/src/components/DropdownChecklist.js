import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { ActionColor, RedSelect } from "./Styles";

const DropdownChecklist = (props) => {
  return (
    <FormControl
      sx={{
        width: "10rem",
        height: "3rem",
        float: "right",
        borderRadius: "0.3rem",
        backgroundColor: `${ActionColor}`,
        color: "#FFFFFF",
      }}
    >
      <InputLabel
        id='demo-multiple-checkbox-label'
        style={{ color: "#FFFFFF", fontWeight:"700", fontSize:"1rem", display:"flex", alignContent:"center" }}
      >
        Select Tags
      </InputLabel>
      <RedSelect
        labelId='demo-multiple-checkbox-label'
        label='Select Tags'
        // style={{height:"3rem"}}
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
          <MenuItem key={item} value={item} name={item}>
            <Checkbox checked={props.selItems.indexOf(item) > -1} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </RedSelect>
    </FormControl>
  );
};
export default DropdownChecklist;
