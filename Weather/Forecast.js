import React, {Component} from 'react'
import Daily from "./Daily"
import ForecastContainer from "./ForecastContainer"

// Create a variable to store the api key and url information
const apiKey = {
    key: "&appid={ENTER YOUR API KEY}",
    url: "https://api.openweathermap.org/data/2.5/forecast?q="
}

// Create variables to get the current date
const date = new Date();
const todayDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear()

class Forecast extends Component{
    // Add a constructor method, to initialize parts of this class
    constructor(){
        super()
        // Giving an initial value of the state
        this.state = {
            currLocation: "",
            currCountry: "",
            currDate: "",
            currTemp: "",
            tempMinMax: "",
            currRealFeel: "",
            currHumidity: "",
            currCondition: "",
            error: false,
            loading: false
        }
        // Bind the method getForecast to the class
        this.getForecast = this.getForecast.bind(this)
    }

    // Method used to for obtaining the current Forecast
    getForecast(location) {
        // Change or update the state of the property loading from false to true
        this.setState({loading: true})
        
        // Fetch the data from the given link
        fetch(apiKey.url + location + apiKey.key)
        // Receive a response from the url we are fetching the data from and format the data into JSON
        .then(response => response.json())
        .then(data => {
            // Convert the temperatures from kelvin to fahrenheit using the formula
            const convertTemp = data.list[0].main.temp;
            const fahrenheit = parseInt((convertTemp - 273.15) * (9/5) + 32);

            const convertRealFeel = data.list[0].main.feels_like;
            const realFeel = parseInt((convertRealFeel - 273.15) * (9/5) + 32);

            const convertTempMin = data.list[0].main.temp_min;
            const tempMin = parseInt((convertTempMin - 273.15) * (9/5) + 32);

            const convertTempMax = data.list[0].main.temp_max;
            const tempMax = parseInt((convertTempMax - 273.15) * (9/5) + 32);

            // Change or update the state objects using the data that we received from fetching the api
            this.setState({
                loading: false,
                currDate: todayDate,
                currTemp: fahrenheit + "°F",
                currRealFeel: "Real Feel: " + realFeel + "°F",
                currCondition: data.list[0].weather[0].main,
                currLocation: location + ",",
                currCountry: data.city.country,
                currHumidity: "Humidity: " + data.list[0].main.humidity + "%",
                tempMinMax: tempMax + "°F" + " / " + tempMin + "°F",
            })
            // Console log the data of the location that is specified
            console.log("Temperature Data of " + location, data)
            /* Catch errors such as invalid location input. Update the state and set error to true
            if the error is caught otherwise the state is set back to false */
        }).catch(error => {
            this.setState({error: true})
        })
        this.setState({error: false})
    }

    // We need to pass the getForest method and all the properties to Daily.js
    // We need to pass the allData and all the properties to ForecastContainer.js
    render(){
        return(
            <div>
                <Daily getForecast = {this.getForecast} />
                <ForecastContainer allData = {this.state} />
            </div>
        )
    }
}

export default Forecast
