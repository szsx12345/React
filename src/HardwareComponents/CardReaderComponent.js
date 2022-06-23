import '../App.css';
import React, { Component, Fragment } from 'react';
import { CardReaderReadRequest } from '../Models/CardReaderReadRequest';

class CardReaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Status: Offline"
    }
    this.handleStatus = this.handleStatus.bind(this);
    this.handleRead = this.handleRead.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
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
    const request = new CardReaderReadRequest(1);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
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

  render(){
    return(
      <Fragment>
        <button
          className='normalBtn'
          aria-label='Get Card Reader Status'
          onClick={this.handleStatus}>{this.state.status}</button>
        <button 
          className='normalBtn'
          aria-label='Card Reader Start Read'
          onClick={this.handleRead}>Read</button>
        <button 
          className='normalBtn'
          aria-label='Cancel Card Reader Action'
          onClick={this.handleCancel}>Cancel</button>
      </Fragment>
    );
  }
}

export default CardReaderComponent;
