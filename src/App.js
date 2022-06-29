import React, { Component } from 'react';
import './App.css';
import { Grid } from '@mui/material';
import { Route, Routes, HashRouter } from 'react-router-dom'
import BillAcceptorComponent from './HardwareComponents/BillAcceptorComponent';
import DocumentScannerComponent from './HardwareComponents/DocumentScannerComponent';
import PrinterComponent from './HardwareComponents/PrinterComponent';
import CardReaderComponent from './HardwareComponents/CardReaderComponent';
import BarcodeScannerComponent from './HardwareComponents/BarcodeScannerComponent';
import HardwareSelectControl from './Controllers/HardwareSelectControl';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            currentHardware:"",
            logMessage:"",
            command:""
        }

        this.changeLogMessage=this.changeLogMessage.bind(this);
        this.showCurrentHardwareName = this.showCurrentHardwareName.bind(this);

    }

    changeLogMessage(command, message) {
        this.setState({command: command});
        this.setState({logMessage: message});
    }

    showCurrentHardwareName(name) {
        this.setState({currentHardware: name});
    }

    render(){
        return(
            <HashRouter>
                <Grid container spacing={2} className='mainGrid'>
                    <Grid item xs={2} className='menuGrid'>
                        <HardwareSelectControl />
                        <Routes>
                            <Route path="/" 
                                element={<BillAcceptorComponent                                         
                                    showLogMessage={this.changeLogMessage} 
                                    getHardwareName={this.showCurrentHardwareName} />}/>
                            <Route path="/billAcceptor"        
                                element={<BillAcceptorComponent
                                    showLogMessage={this.changeLogMessage}
                                    getHardwareName={this.showCurrentHardwareName} />}/>
                            <Route path="/documentScanner"
                                element={<DocumentScannerComponent
                                    getHardwareName={this.showCurrentHardwareName} 
                                    showLogMessage={this.changeLogMessage} />} />
                            <Route path="/printer"
                                element={<PrinterComponent
                                    getHardwareName={this.showCurrentHardwareName} 
                                    showLogMessage={this.changeLogMessage} />} />
                            <Route path="/cardReader"
                                element={<CardReaderComponent
                                    getHardwareName={this.showCurrentHardwareName} 
                                    showLogMessage={this.changeLogMessage} />} />
                            <Route path="/barcodeScanner"
                                element={<BarcodeScannerComponent
                                    getHardwareName={this.showCurrentHardwareName} 
                                    showLogMessage={this.changeLogMessage} />} />                                            
                        </Routes>
                    </Grid>
                    <Grid item xs={9} className='secondGrid'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <label className='commandLabel'>{this.state.command}</label>
                                <br/>
                                <label className='logTextField'>{this.state.logMessage}</label>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </HashRouter>
        );
    }
}
export default App;