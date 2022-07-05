import '../App.css';
import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import HardwareConfigTextBox from '../Controllers/HardwareConfigTextBox';

class DocumentScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      command: "",
      commandRequest: ""
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleIntake = this.handleIntake.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleEject = this.handleEject.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommandSelect = this.handleCommandSelect.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.props.getHardwareName("Document Scanner");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/DocumentScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data.Status.State);
      this.setState({status: "Status: " + data.Status.State});
      this.props.showLogMessage("Status", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleIntake(){
    this.props.showLogMessage("Intake", "");
    fetch( 'http://localhost:8888/api/Intake/DocumentScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Intake", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleScan(){
    this.props.showLogMessage("Scan", "");
    fetch( 'http://localhost:8888/api/Scan/DocumentScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Scan", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleEject(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: this.state.commandRequest
    };
    this.props.showLogMessage("Eject", "");
    fetch( 'http://localhost:8888/api/Eject/DocumentScanner', requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Eject", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCancel(){
    this.props.showLogMessage("Cancel", "");
    fetch( 'http://localhost:8888/api/Cancel/DocumentScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Cancel", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCommandSelect(event){
    this.setState({command: event.target.value});
    switch (event.target.value) {
      case "eject":
        this.setState({request: {
          "stamp": false
        }})
        break;
      case "status":
      case "intake":
      case "scan":
      case "cancel":
      default:
        break;
    }
  }

  sendCommand() {
    switch (this.state.command) {
      case "status":
        return this.handleStatus();
      case "intake":
        return this.handleIntake();
      case "scan":
        return this.handleScan();
      case "eject":
        return this.handleEject();
      case "cancel":
        return this.handleCancel();
      default:
        break;
    }
  }

  
  textFieldOnchange(e) {
    this.setState({commandRequest: e.target.value})
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
                    <MenuItem value={"intake"}>Intake</MenuItem>
                    <MenuItem value={"scan"}>Scan</MenuItem>
                    <MenuItem value={"eject"}>Eject</MenuItem>
                    <MenuItem value={'cancel'}>Cancel</MenuItem>
                </Select>
        </FormControl>
        <HardwareConfigTextBox requestContent={this.state.request} onChange={this.textFieldOnchange.bind(this)}/> 
      </Fragment>
    );
  }
}

export default DocumentScannerComponent;
