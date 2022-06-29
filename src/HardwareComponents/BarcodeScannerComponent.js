import '../App.css';
import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import HardwareConfigTextBox from '../Controllers/HardwareConfigTextBox';

class BarcodeScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      command: ""
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommandSelect = this.handleCommandSelect.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.props.getHardwareName("Barcode Scanner");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/BarcodeScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data.Status.State);
      this.setState({status: "Status: " + data.Status.State});
      this.props.showLogMessage("Status", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleScan(){
    this.props.showLogMessage("Scan", "");
    fetch( 'http://localhost:8888/api/Scan/BarcodeScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Scan", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCancel(){
    this.props.showLogMessage("Cancel", "");
    fetch( 'http://localhost:8888/api/Cancel/BarcodeScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Cancel", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCommandSelect(event){
      this.setState({command: event.target.value});
  }

  sendCommand() {
    switch (this.state.command) {
      case "status":
        return this.handleStatus()
      case "scan":
        return this.handleScan()
      case "cancel":
        return this.handleCancel()
      default:
        break;
    }
  }


  render(){
    return(
      <Fragment>
        <button
          className='normalBtn'
          aria-label='Send hardware command'
          onClick={this.sendCommand}>Send Command</button>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Command</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.command}
                    label="Command"
                    onChange={this.handleCommandSelect}
                >
                    <MenuItem value={"status"}>Status</MenuItem>
                    <MenuItem value={"scan"}>Scan</MenuItem>
                    <MenuItem value={'cancel'}>Cancel</MenuItem>
                </Select>
        </FormControl> 
        <HardwareConfigTextBox/> 
      </Fragment>
    );
  }
}

export default BarcodeScannerComponent;
