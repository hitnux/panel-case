import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import AlertModal from '../alert'
import './index.scss'

const Filter = ({
    label = 'Label',
    value = [],
    onChange = () => { },
    data = [],
    tabs = false
}) => {
    const [val, setVal] = useState(value);
    const [alert, setAlert] = useState(false);
    const changed = (e) => {
        if (e.target.value.length > 0) {
            setVal(e.target.value);
            onChange(e);
        } else {
            setAlert(true)
        }
    }

    const all = () => {
        setVal(value);
        onChange({ target: { value } });
    }

    const only = (event) => {
        const e = { target: { value: [event.target.value] } }
        setVal(e.target.value);
        onChange(e);
    }

    const alertChange = () => {
        setAlert(false);
    }

    return (
        <>
            {tabs &&
                <div className="tabs">
                    <button onClick={all} className={val.length === value.length ? 'active' : ''}>All Orders</button>
                    {value.map((v) =>
                        <button key={v} onClick={only} className={val.length === 1 & val[0] === v ? 'active' : ''} value={v}>{v} Orders</button>
                    )}
                </div>
            }
            {!tabs &&
                <>
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
                    <AlertModal state={alert} onChange={alertChange}>En az bir değer seçilmeli</AlertModal>

                </>
            }

        </>

    )
}

export default Filter;