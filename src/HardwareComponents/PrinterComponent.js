import '../App.css';
import React, { Component, Fragment } from 'react';
import { PrinterRequest } from '../Models/PrinterRequest';

class PrinterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline",
      htmlFile: null
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handlePrint = this.handlePrint.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSelectFile = this.handleSelectFile.bind(this);
    this.selectFileRef = React.createRef();
    this.props.getHardwareName("Printer");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/Printer',{method:"GET"})
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
      this.props.showLogMessage("Print", JSON.stringify(data))
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
      this.props.showLogMessage("Cancel", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  render(){
    return(
      <Fragment>
        <button
          className='normalBtn'
          aria-label='Get Printer Status'
          onClick={this.handleStatus}>{this.state.status}</button>
        <input type="file" id="file" ref={this.selectFileRef} style={{ display: "none" }} onChange={this.handleFileUpload.bind(this)}/>
        <button 
          className='normalBtn'
          aria-label='Select HTML File'
          onClick={this.handleSelectFile}>Select File</button>
        <button 
          className='normalBtn'
          aria-label='Printer Start Print'
          onClick={this.handlePrint}>Print</button>
        <button 
          className='normalBtn'
          aria-label='Cancel Printer Action'
          onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default PrinterComponent;
