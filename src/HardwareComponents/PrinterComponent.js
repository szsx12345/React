import '../App.css';
import React, { Component, Fragment } from 'react';
import { PrinterRequest } from '../Models/PrinterRequest';
import HardwareConfigTextBox from '../Controllers/HardwareConfigTextBox';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';

class PrinterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      htmlFile: null,
      command: ""
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.selectFileRef = React.createRef();
    this.handleCommandSelect = this.handleCommandSelect.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.props.getHardwareName("Printer");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/Printer',{method:"GET"})
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

  handleFileUpload(value){
    var file = value.target.files[0];
    var reader = new FileReader();
    const scope = this;
    if(file.type !== 'text/html'){
      scope.props.showLogMessage("Select File", 'Only Accept HTML File');
    } else {
      reader.onload = function(event) {
        if (event.target.result) {
          scope.setState({htmlFile: event.target.result});
          scope.props.showLogMessage("Select File", 'Success');
        } 
        else {
          scope.props.showLogMessage("Select File", 'Failed');
        }
      };
      reader.readAsText(file);
    }
  }

  handleSelectFile(){
    this.selectFileRef.current.click();
  }

  handlePrint(){
    if(this.state.htmlFile === null) {
      this.props.showLogMessage("Print", 'Please Select File First')
    }
    const request = new PrinterRequest(this.state.htmlFile);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
    this.props.showLogMessage("Print", "");
    fetch( 'http://localhost:8888/api/Print/Printer', requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Print", JSON.stringify(data, null, 2))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleCancel(){
    this.props.showLogMessage("Cancel", "");
    fetch( 'http://localhost:8888/api/Cancel/Printer',{method:"GET"})
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
        return this.handleStatus();
      case "print":
        return this.handlePrint();
      case "cancel":
        return this.handleCancel();
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
                    <MenuItem value={"print"}>Print</MenuItem>
                    <MenuItem value={'cancel'}>Cancel</MenuItem>
                </Select>
        </FormControl> 
        <input type="file" id="file" ref={this.selectFileRef} style={{ display: "none" }} onChange={this.handleFileUpload.bind(this)}/>
        <button 
          className='selectFileBtn'
          aria-label='Select HTML File'
          onClick={this.handleSelectFile}>Select File</button>
        <HardwareConfigTextBox/> 
      </Fragment>
    );
  }
}

export default PrinterComponent;
