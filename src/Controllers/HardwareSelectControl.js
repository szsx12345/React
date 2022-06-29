import '../App.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';


export default function HardwareSelectControl() {

    const [selectHardware, setSelectHardware] = React.useState('billAcceptor');
    const navigate = useNavigate()

    const handleChange = (event) => {
        setSelectHardware(event.target.value);
        navigate(`/${event.target.value}`);
     };

    return(
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hardware</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectHardware}
                    label="Hardware"
                    onChange={handleChange}
                >
                    <MenuItem value={"billAcceptor"}>Bill Acceptor</MenuItem>
                    <MenuItem value={"documentScanner"}>Document Scanner</MenuItem>
                    <MenuItem value={'printer'}>Printer</MenuItem>
                    <MenuItem value={'cardReader'}>Card Reader</MenuItem>
                    <MenuItem value={"barcodeScanner"}>Barcode Scanner</MenuItem>
                </Select>
        </FormControl>
    );
}

