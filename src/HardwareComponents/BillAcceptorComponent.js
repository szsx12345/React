import '../App.css';
import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import HardwareConfigTextBox from '../Controllers/HardwareConfigTextBox';

class BillAcceptorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      command: ""
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleIntake = this.handleIntake.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleEject = this.handleEject.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommandSelect = this.handleCommandSelect.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.props.getHardwareName("Bill Acceptor");
  }
    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/BillAcceptor',{method:"GET"})
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
    fetch( 'http://localhost:8888/api/Intake/BillAcceptor',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Intake", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleAccept(){
    this.props.showLogMessage("Accept", "");
    fetch( 'http://localhost:8888/api/Accept/BillAcceptor',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Accept", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleEject(){
    this.props.showLogMessage("Eject", "");
    fetch( 'http://localhost:8888/api/Eject/BillAcceptor',{method:"GET"})
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
    fetch( 'http://localhost:8888/api/Cancel/BillAcceptor',{method:"GET"})
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
  }

  sendCommand() {
    switch (this.state.command) {
      case "status":
        return this.handleStatus()
      case "intake":
        return this.handleIntake()
      case "accept":
        return this.handleAccept()
      case "eject":
        return this.handleEject()
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
                    <MenuItem value={"intake"}>Intake</MenuItem>
                    <MenuItem value={"accept"}>Accept</MenuItem>
                    <MenuItem value={"eject"}>Eject</MenuItem>
                    <MenuItem value={'cancel'}>Cancel</MenuItem>
                </Select>
        </FormControl>
        <HardwareConfigTextBox/> 
      </Fragment>
    );
  }
}

export default BillAcceptorComponent;
