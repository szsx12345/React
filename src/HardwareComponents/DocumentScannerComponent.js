import '../App.css';
import React, { Component, Fragment } from 'react';
import { DocumentScannerRequest } from '../Models/DocumentScannerRequest';

class DocumentScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline"
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleIntake = this.handleIntake.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleEject = this.handleEject.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.props.getHardwareName("Document Scanner");
  }

    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/DocumentScanner',{method:"GET"})
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

  handleIntake(){
    this.props.showLogMessage("Intake", "");
    fetch( 'http://localhost:8888/api/Intake/DocumentScanner',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Intake", JSON.stringify(data))
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
      this.props.showLogMessage("Scan", JSON.stringify(data))
    })
    .catch(e => {
        console.log(e);
    })
  }

  handleEject(){
    const request = new DocumentScannerRequest(false);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
    this.props.showLogMessage("Eject", "");
    fetch( 'http://localhost:8888/api/Eject/DocumentScanner', requestOptions)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Eject", JSON.stringify(data))
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
          aria-label='Get Document Scanner Status'
          onClick={this.handleStatus}>{this.state.status}</button>
        <button 
          className='normalBtn'
          aria-label='Document Scanner Start Intake'
          onClick={this.handleIntake}>Intake</button>
        <button 
          className='normalBtn'
          aria-label='Document Scanner Start Scan'
          onClick={this.handleScan}>Scan</button>
        <button 
          className='normalBtn'
          aria-label='Document Scanner Start Eject'
          onClick={this.handleEject}>Eject</button>
        <button 
          className='normalBtn'
          aria-label='Cancel Document Scanner Action'
          onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default DocumentScannerComponent;
