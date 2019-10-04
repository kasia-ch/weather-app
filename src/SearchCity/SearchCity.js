import React from 'react';
import './SearchCity.css';


class SearchCity extends React.Component {
    render() {
        const { value, change, submit } = this.props

        let content;

        if (!this.state.error && this.state.city) {
            content = (
                <div>
                    <h3>Weather in <em>{this.state.city}</em></h3>
                </div>
            )
        }
        return (
            <div>
                <h1 className="mx-auto" style={{ "width": "800px" }}> Current weather and forecasts in your city</h1>
                <div>
                    {this.state.error ? 'Not found ${this.state.city}' : content}
                    <div className="input-group mb-3 container">
                        <input type="text" name="input" className="form-control" placeholder="City name" aria-label="city name"
                            aria-describedby="button-addon"
                            value={value}
                            onChange={(event) => {
                                change(event)
                            }} />
                    </div>

                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"
                            id="button-addon2"
                            onClick={(event) => (
                                submit(event)
                            )}>OK</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchCity;