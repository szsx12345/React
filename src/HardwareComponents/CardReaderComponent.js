import '../App.css';
import React, { Component, Fragment } from 'react';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import HardwareConfigTextBox from '../Controllers/HardwareConfigTextBox';

class CardReaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      command: "",
      commandRequest: ""
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCommandSelect = this.handleCommandSelect.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.props.getHardwareName("Card Reader");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/CardReader',{method:"GET"})
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

  handleRead(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: this.state.commandRequest
    };
    this.props.showLogMessage("Read", "");
    fetch( 'http://localhost:8888/api/Read/CardReader', requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Read", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCancel(){
    this.props.showLogMessage("Cancel", "");
    fetch( 'http://localhost:8888/api/Cancel/CardReader',{method:"GET"})
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
    switch (event.target.value) {
      case "read":
        this.setState({request: {
          "amount": 1
        }});
        this.setState({commandRequest: {
          "amount": 1
        }})
        break;
      case "status":
      case "cancel":
      default:
        break;
    }
  }

  sendCommand() {
    switch (this.state.command) {
      case "status":
        return this.handleStatus();
      case "read":
        return this.handleRead();
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
                    <MenuItem value={"read"}>Read</MenuItem>
                    <MenuItem value={'cancel'}>Cancel</MenuItem>
                </Select>
        </FormControl>
        <HardwareConfigTextBox requestContent={this.state.request} onChange={this.textFieldOnchange.bind(this)}/> 
      </Fragment>
    );
  }
}

export default CardReaderComponent;
