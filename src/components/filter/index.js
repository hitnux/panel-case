import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

const Filter = ({
    label = 'Label',
    value = [],
    onChange = () => { },
    data = []
}) => {
    const [val, setVal] = useState(value);
    const changed = (e) => {
        setVal(e.target.value);
        onChange(e);
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 100, maxWidth: 170 }} size="small">
            <InputLabel id="demo-select-small">{label}</InputLabel>
            <Select
                multiple
                displayEmpty
                value={val}
                label={label}
                onChange={changed}
            >
                {data.map((d) => (
                    <MenuItem key={d} value={d}>{d}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default Filter;