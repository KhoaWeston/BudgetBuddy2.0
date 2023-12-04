import React, { useEffect } from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import { Button } from '@mui/material';
import { App } from "realm-web";
import { APP_ID } from "../contexts/realm/constants.js";
import ChartsEmbedSDK, { getRealmUserToken } from '@mongodb-js/charts-embed-dom';
//import { UserContext } from "../contexts/user.context";
//import { ObjectId } from 'mongodb';

const app = new App(APP_ID);

// Embeds a chart for users that are logged in
const sdk = new ChartsEmbedSDK( {
    baseUrl: "https://charts.mongodb.com/charts-project-0-qxtjo",
    autoRefresh: true,
    getUserToken: () => getRealmUserToken(app),
});

// Formats embedded chart 
const chart1 = sdk.createChart({
    chartId: '655fc617-5768-4074-84c3-e714d5e34c62',
    width: "90%",
    height: 400,
});


const Analytics=()=>{
    // const { user } = useContext(UserContext);
    // const userID1 = app.currentUser.id;
    // const userID2 = user.id;
    // const userObjectId = new ObjectId('help');
    // console.log(userID1);
    // console.log(userID2);
    // console.log({$toObjectId: "5ab9cbfa31c2ab715d42129e"});

    // Filters chart entries between dates entered by user
    const changeDate = async()=>{
        const fromDateSelect = document.getElementById("date-from");
        const toDateSelect = document.getElementById("date-to");
        const fromDate = new Date(fromDateSelect.value);
        const toDate = new Date(toDateSelect.value);
        chart1.setFilter({ createdAt: { $gte: fromDate,  $lt: toDate }});
    }
    
    // Renders the chart when user is on specific page
    const renderChart =()=>{
        if (window.location.pathname === "/analytics") {
            chart1
                .render(document.getElementById('chart1'))
                .catch(() => window.alert('Reload the page (Ctrl+R)'));
        }
    }

    // Refreshes the chart for new entries
    const refreshChart =()=>{
        // console.log({$toObjectId: userID2} );
        // chart1.setFilter({ author: {$toObjectId: userID1} });
        chart1.refresh();
    }

    useEffect(() => {
        renderChart();
    }, []);

    return(
        <div>
            <Header/>
            <Footer/>
            <h1><form style={{ maxWidth: "350px", margin: "auto" }}>Your Analytics</form></h1>
            <div className="row">
                <div style={{ flex: "10%"}} >
                    <div>Show data </div>
                    <div style={{ textAlign: "right" }} >
                        <label>from: <input className="inputDate" type="date" id="date-from" /></label>
                        <div><label>to: <input className="inputDate" type="date" id="date-to" /></label></div>
                    </div>    
                    <Button variant="contained" onClick={changeDate} style={{ width: "75px", margin: "auto" }}>Enter</Button> 
                </div>
                <div style={{ flex: "80%"}}>
                    <div id="chart1" className="chart"></div>
                    <Button variant="contained" onClick={refreshChart}>Refresh</Button>
                </div>
            </div>
        </div>
    )
}
export default Analytics;