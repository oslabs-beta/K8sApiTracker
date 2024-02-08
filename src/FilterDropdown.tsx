import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// type FilterDropdownProps = {
//   filter?: () => void;
// }

//source code is here: https://mui.com/material-ui/react-select/#multiple-select


export default function FilterDropdown() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: '10vw' }}>
        <InputLabel id="demo-multiple-checkbox-label">Filter</InputLabel>
        <Select
          // use multiple to 
          multiple
          // value stores the text in the box 
          value={personName} 
          // this code 
          onChange={handleChange}
          // 
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
        >
          <MenuItem>
            <Checkbox />
            <ListItemText primary="stable" />
          </MenuItem>
          <MenuItem>
            <Checkbox />
            <ListItemText primary="updateAvailable" />
          </MenuItem>
          <MenuItem>
            <Checkbox />
            <ListItemText primary="deprecated" />
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}