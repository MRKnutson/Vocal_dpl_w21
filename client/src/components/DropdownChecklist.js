import React, {useState, useEffect} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { SecondaryColor } from './Styles';

const DropdownChecklist = (props) => {
    // const [selItems, setSelItems] = useState(props.selItems);
    const [items, setItems] = useState(props.items);
    // useEffect(()=>{
    //     props.setState(selItems)
    // }, [selItems])



    return(
    <div>
        <p>Select Tag(s): </p>
        <FormControl sx={{width: "30rem" }} style={{backgroundColor: "white", borderRadius: "0.35rem"}}>
            {/* {<InputLabel id="demo-multiple-checkbox-label">{props.tag}</InputLabel>} */}
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={props.selItems}
            onChange={(e)=>{
                props.setState(e.target.value)
            }}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            >
            {props.items.map((item) => (
                <MenuItem key={item} value={item} name={item}>
                <Checkbox checked={props.selItems.indexOf(item) > -1} />
                <ListItemText primary={item} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    )
    }
export default DropdownChecklist