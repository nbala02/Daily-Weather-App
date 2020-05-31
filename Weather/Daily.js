import React from 'react'

class Daily extends React.Component{
    // Add a constructor method, to initialize parts of this class
    constructor(){
        super()
        // Giving an initial value of the state
        this.state = {
            location: ""
        }
        // Bind the method handleChange to the class
        this.handleChange = this.handleChange.bind(this)
    }

    // Method used for handling the event of clicking on the submit button
    handleChange(event) {
        // Change or update the state of the property location based on the location being entered by user
        this.setState({location: event.target.value})
    }

    render(){
        return(
            // Set up the input of the search bar
            // For button receieve props from the getForecast method with the location being entered by user
            // This will occur when the submit button is pressed
            <div>
                <input 
                    type = "text" 
                    className = "searchBar"
                    placeholder = "Search Location..."
                    value = {this.state.location}
                    onChange = {this.handleChange}
                />
                <button className = "searchButton" onClick = {() => {this.props.getForecast(this.state.location)}}>Search</button>
            </div>
        )
    }
}

export default Daily
