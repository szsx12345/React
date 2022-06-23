import '../App.css';
import React, { Component, Fragment } from 'react';

class BarcodeScannerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline"
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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

  render(){
    return(
      <Fragment>
        <button
          className='normalBtn'
          aria-label='Get Barcode Scanner Status'
          onClick={this.handleStatus}>{this.state.status}</button>
        <button 
          className='normalBtn'
          aria-label='Start Scan Barcode'
          onClick={this.handleScan}>Scan</button>
        <button 
          className='normalBtn'
          aria-label='Cancel Barcode Scanner Action'
          onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default BarcodeScannerComponent;
