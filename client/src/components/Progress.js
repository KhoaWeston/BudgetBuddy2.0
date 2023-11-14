import React, { useState } from "react";
import Header from './Header.js';
import Footer from './Footer.js';

const Progress=()=>{
    const [progress, setProgress] = useState(0);
    const handlebuttonClick = ()=>{
        if (progress < 100){
            setProgress(progress + 20);
        }
    }
    const handlebuttonReset=()=>{
        setProgress(0);
    }
    const getColor=()=>{
        if(progress < 40){
            return "#ff0000";
        } else if (progress < 70){
            return "#ffa500";
        } else {
            return "#2ecc71";
        }
    }

    return(
        <div className="container">
            <Header/>
            <Footer/>
            <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%`, backgroundColor: getColor() }}></div>
            </div>
            <div className="progress-label">{progress}</div>
            <button onClick={handlebuttonClick}>Progress</button>
            <button onClick={handlebuttonReset}>Reset</button>
        </div>
    )
}
export default Progress
