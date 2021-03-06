import React from 'react';
import './App.css';
import SearchCity from './SearchCity/SearchCity';
import ViewWeather from './ViewWeather/ViewWeather';
import axios from 'axios';

const APIKey = '05508bb378ad891b493b0c886cca7a57';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      weather: {
        date: "",
        city: "",
        geoCoords: "",
        sunrise: "",
        sunset: "",
        temp: "",
        temp_min: "",
        temp_max: "",
        pressure: "",
        wind: "",
        humidity: "",
        rain: "",
        snow: "",
        cloudiness: ""
      },
      imBusy: false,
      error: false,
    }
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleCitySubmit = (event) => {
    event.preventDefault()

    this.setState({
      'imBusy': true
    });

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`)
      .then(res => {
        const weatherData = res.data;

        console.log('success', weatherData);

        this.setState({
          imBusy: false,
          error: false,
          weather: {
            date: this.state.date,
            city: this.state.value,
            geoCoords: `lat: ${weatherData.coord.lat}, lon: ${weatherData.coord.lon}`,
            sunrise: weatherData.sys.sunrise,
            sunset: weatherData.sys.sunset,
            temp: weatherData.main.temp,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            pressure: weatherData.main.pressure,
            wind: weatherData.wind.speed,
            humidity: weatherData.main.humidity,
            rain: weatherData.rain,
            snow: weatherData.snow,
            cloudiness: weatherData.clouds.all,
          }
        });
      })
      .catch(error => {
        console.log('error', this.state, error);
        this.setState(prevState => ({
          error: true,
          imBusy: false,
        }));
      })
  }

  render() {
    const { value, weather, imBusy, error } = this.state

    if (imBusy === true) {
      return (<div className="container wrapper">
        <h1 className="text-center">Please wait</h1>
      </div>)
    }
    return (
      <div className="wrapper">
        <div className="app container">
          <SearchCity
            value={this.state.value}
            change={this.handleInputChange}
            submit={this.handleCitySubmit}
          />
          <ViewWeather
            error={this.state.error}
            weather={this.state.weather} />
        </div>
      </div>
    );
  }
}

export default App;
