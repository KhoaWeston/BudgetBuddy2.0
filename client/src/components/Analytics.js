import React, { useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from '@mui/material'
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const sdk = new ChartsEmbedSDK( {
    baseUrl: "https://charts.mongodb.com/charts-project-0-qxtjo"
});

// embed a chart
const chart1 = sdk.createChart({
    chartId: '655fc617-5768-4074-84c3-e714d5e34c62',
    width: "90%",
    height: 400
});

const Analytics=()=>{
    const app = new App(APP_ID);

    const changeDate = async()=>{
        const userID = app.currentUser
        const fromDateSelect = document.getElementById("fromDateField");
        const toDateSelect = document.getElementById("toDateField");
        const fromDate = parseInt(fromDateSelect.value);
        const toDate = parseInt(toDateSelect.value);
        //chart1.setFilter( { author: userID })
        //chart1.setFilter( { createdAt: { $gte: new Date(Date.UTC(fromDate)), $lte: new Date(Date.UTC(toDate)) } } );
    }
    
    const renderChart =()=>{
        if (window.location.pathname === "/analytics") {
            chart1
                .render(document.getElementById('chart1'))
                .catch(() => window.alert('Refresh window'));
        }
    }

    useEffect(() => {
        renderChart();
    }, []);

    return(
        <div>
            <Header/>
            <Footer/>
            <h1><form style={{ maxWidth: "350px", margin: "auto" }}>Display analytics here</form></h1>
            <div className="row">
                <div style={{ flex: "10%"}} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DateField','DateField']}>
                            <DateField id="fromDateField" label="From" style={{ width: "100px", margin: "auto" }}/>
                            <DateField id="toDateField" label="To" style={{ width: "100px", margin: "auto" }}/>
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button variant="contained" onClick={changeDate} style={{ width: "75px", margin: "auto" }}>Enter</Button>
                </div>
                <div style={{ flex: "80%"}}>
                    <div id="chart1" className="chart"></div>
                </div>
            </div>
        </div>
    )
}
export default Analytics;