import '../App.css';
import React, { Component, Fragment } from 'react';

class BillAcceptorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline"
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleIntake = this.handleIntake.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleEject = this.handleEject.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.props.getHardwareName("Bill Acceptor");
  }
    
  handleStatus(){
    this.props.showLogMessage("Status", "");
    fetch( 'http://localhost:8888/api/Status/BillAcceptor',{method:"GET"})
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
    fetch( 'http://localhost:8888/api/Intake/BillAcceptor',{method:"GET"})
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.props.showLogMessage("Intake", JSON.stringify(data))
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
      this.props.showLogMessage("Accept", JSON.stringify(data))
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
      this.props.showLogMessage("Eject", JSON.stringify(data))
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
          aria-label='Get Bill Acceptor Status'
          onClick={this.handleStatus}>{this.state.status}</button>
        <button 
          className='normalBtn'
          aria-label='Bill Acceptor Start Intake'
          onClick={this.handleIntake}>Intake</button>
        <button 
          className='normalBtn'
          aria-label='Bill Acceptor Accept Bill'
          onClick={this.handleAccept}>Accept</button>
        <button 
          className='normalBtn'
          aria-label='Bill Acceptor Eject Bill'
          onClick={this.handleEject}>Eject</button>
        <button 
          className='normalBtn'
          aria-label='Cancel Bill Acceptor Action'
          onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default BillAcceptorComponent;
