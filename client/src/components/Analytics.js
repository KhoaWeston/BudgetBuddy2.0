import React, { useContext, useEffect, useState } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from '@mui/material';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";
import ChartsEmbedSDK, { getRealmUserToken } from '@mongodb-js/charts-embed-dom';
import { UserContext } from "../contexts/user.context";

const app = new App(APP_ID); // Creating a Realm App Instance

const Analytics=()=>{
    const { user } = useContext(UserContext);
    const [chartHeight, setChartHeight] = useState(window.innerHeight);
    const [chartType, setChartType]= useState("chart2");
    
    // Embeds a chart for users that are logged in
    const sdk = new ChartsEmbedSDK( {
        baseUrl: "https://charts.mongodb.com/charts-project-0-qxtjo",
        autoRefresh: true,
        getUserToken: () => getRealmUserToken(app),
    });

    // Formats embedded bar chart 
    const chart1 = sdk.createChart({
        chartId: '655fc617-5768-4074-84c3-e714d5e34c62',
        width: "90%",
        height: chartHeight/1.8,
        filter: {"author":{'$oid': user.id}} // filters the chart by user
    });

    // Formats embedded donut chart
    const chart2 = sdk.createChart({
        chartId: '659df7a6-a1ec-4b3d-86bd-2e08470b3220',
        width: "90%",
        height: chartHeight/1.8,
        filter: {"author":{'$oid': user.id}} // filters the chart by user
    });

    // Filters chart entries between dates entered by user
    const changeDate = async()=>{
        const fromDateSelect = document.getElementById("date-from");
        const toDateSelect = document.getElementById("date-to");
        const fromDate = new Date(fromDateSelect.value);
        const toDate = new Date(toDateSelect.value);
        if(fromDate==="Invalid Date" || toDate==="Invalid Date"){
            alert("Please fill both date fields.");
            return;
        }
        if(chartType === "chart1"){
            chart1.setFilter({author: {'$oid': user.id}, createdAt: { $gte: fromDate,  $lt: toDate }});
        }else{
            chart2.setFilter({author: {'$oid': user.id}, createdAt: { $gte: fromDate,  $lt: toDate }});
        }
    }


    // Renders the chart when user is on specific page
    const renderChart =()=>{
        if (window.location.pathname === "/analytics") {
            if(chartType === "chart1"){
                chart1
                    .render(document.getElementById('chart1'))
                    .catch(() => window.alert('Reload the page (Ctrl+R)'));
            }else{
                chart2
                    .render(document.getElementById('chart2'))
                    .catch(() => window.alert('Reload the page (Ctrl+R)'));
            }
            
        }
    }

    useEffect(() => {
        renderChart();
        const handleWindowResize = () => {
            // Set the height in state
            setChartHeight(window.innerHeight);
        }
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    });

    return(
        <div className="app-container">
            <Header/>
            <h1><form style={{ maxWidth: "350px", margin: "auto", textAlign:"center"}}>Your Analytics</form></h1>
            <div className="row">
                <div style={{ flex: "10%"}} >
                    <div className="comp-container" style={{marginBottom:"20px"}}>
                        <div>Select Chart Type: </div>
                        <select className="inputType" value={chartType} onChange={e => setChartType(e.target.value)}>
                            <option value="chart2">Donut</option>
                            <option value="chart1"> Bar</option>
                        </select>
                    </div>
                    <div className="comp-container" style={{ marginBottom:"50px "}}>
                        <div>Show data </div>
                        <div style={{ textAlign: "right" }} >
                            <label>from: <input className="inputDate" type="date" id="date-from" /></label>
                            <div><label>to: <input className="inputDate" type="date" id="date-to" /></label></div>
                        </div>    
                        <div style={{ textAlign:"center"}}><Button variant="contained" onClick={changeDate} style={{ width: "75px"}}>Enter</Button></div> 
                    </div>
                </div>
                <div style={{ marginLeft:"50px", flex: "75%"}}>
                    <div id={chartType} className="chart"></div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Analytics;