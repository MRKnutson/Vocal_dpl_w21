import React, {useState, useEffect, useRef} from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const DropdownChecklist = (props) => {
    const [selItems, setSelItems] = useState([]);
    const [items, setItems] = useState(props.items);
    const prevItems = useRef([])
    useEffect(()=>{
        props.setState(selItems)
    }, [selItems])

     useEffect(() => {
        //  console.log("prev current sel: " + prevItems.current, items, selItems)
        let diff = items.filter(i => !prevItems.current.includes(i))
        if(diff.length>0){setSelItems([...selItems, diff[0]])}
        prevItems.current = items;
        
    }, [items]);

    return(
    <div>
        <FormControl sx={{ m: 1, width: 300 }}>
            {<InputLabel id="demo-multiple-checkbox-label">{props.tag}</InputLabel>}
            <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selItems}
            onChange={(e)=>{
                setSelItems(e.target.value)
                
            }}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
            >
            {props.items.map((item) => (
                <MenuItem key={item} value={item} name={item}>
                <Checkbox checked={selItems.indexOf(item) > -1} />
                <ListItemText primary={item} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
    )
    }
export default DropdownChecklist