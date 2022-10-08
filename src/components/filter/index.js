import { useState } from 'react';
import { FormControl, Select, MenuItem, InputLabel, Snackbar, Alert } from '@mui/material';
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

    if (tabs)
        return (
            <div className="tabs">
                <button
                    onClick={(() => {
                        setVal(value);
                        onChange({ target: { value } });
                    })}
                    className={val.length === value.length ? 'active' : ''}>
                    All Orders
                </button>
                {value.map((v) =>
                    <button
                        key={v}
                        onClick={((event) => {
                            const e = { target: { value: [event.target.value] } }
                            setVal(e.target.value);
                            onChange(e);
                        })}
                        className={val.length === 1 & val[0] === v ? 'active' : ''}
                        value={v}>
                        {v} Orders
                    </button>
                )}
            </div>
        )

    return (
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
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                onClose={(() => { setAlert(false) })}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Alert onClose={(() => { setAlert(false) })} severity="error" sx={{ width: '100%' }}>
                    En az bir değer seçilmeli
                </Alert>
            </Snackbar>
        </>
    )
}

export default Filter;