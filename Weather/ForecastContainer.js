import React from 'react'

// Add all the return here and we are receiving props
// This file is caring all the UI aspect of the form

// This function will receive props from Forecast.js
function ForecastContainer(props){ 
    return(
        <div>
            <div className = "loading">{props.allData.loading ? "Loading..." : null}</div>
            <div className = "error">{props.allData.error ? "INVALID LOCATION" : null}</div>
            <div className = "date">{props.allData.currDate}</div>
            <div className = "location">{props.allData.currLocation} {props.allData.currCountry}</div>
            <div className = "temperatureContainer">
                <div className = "temperature">{props.allData.currTemp} 
                <br /> 
                <div style = {{fontSize: "18px"}}>{props.allData.currRealFeel}</div>
                </div>
            </div>
            <div className = "weather">{props.allData.currCondition}</div>
            <div className = "minMax">{props.allData.tempMinMax}</div>
            <div className = "humidity">{props.allData.currHumidity}</div>
        </div>
    )
}

export default ForecastContainer