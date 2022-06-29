import '../App.css';
import React from 'react';
import { Box, TextField } from '@mui/material';


export default function HardwareConfigTextBox(props) {

    const requestString = JSON.stringify(props.requestContent, null, 2);
    
    return(
        <Box
        component="form"
        sx={{
          '& > :not(style)': { mt: 5, width: '307px', height: '500px' },
        }}    
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" variant="outlined" multiline rows={20} defaultValue={requestString} onChange = {props.onChange} />
      </Box>
    );
}

