import React, {Component} from 'react';
import classnames from 'classnames';
import axios from 'axios';
import './front-card.css';

class FrontCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: null,
            temp: null,
            wind: null,
            hum: null,
            icon: null,
            isFirstRender: true
        };
        this.loadDataFromAPI = this.loadDataFromAPI.bind(this);
    }

    componentDidMount() {
        this.setState({ isFirstRender: false });
    }

    componentWillReceiveProps(){
        this.setState({ isFirstRender: true });
    }

    componentDidUpdate(){
        if(this.state.isFirstRender){
            this.loadDataFromAPI();
            this.setState({ isFirstRender: false });
        }
    }

    loadDataFromAPI() {
        let key = '9d78e245edd03363b82092e06a8bf8bb';
        let url = 'http://api.openweathermap.org/data/2.5/';

        let iconMap = {
            "01d": "wi-day-sunny",
            "02d": "wi-day-cloudy",
            "03d": "wi-cloud",
            "04d": "wi-cloudy",
            "09d": "wi-rain",
            "10d": "wi-day-rain",
            "11d": "wi-storm-showers",
            "13d": "wi-snow",
            "50d": "wi-dust",
            "01n": "wi-night-clear",
            "02n": "wi-night-alt-cloudy",
            "03n": "wi-cloud",
            "04n": "wi-cloudy",
            "09n": "wi-rain",
            "10n": "wi-night-alt-hail",
            "11n": "wi-storm-showers",
            "13n": "wi-snow",
            "50n": "wi-dust",
        };

        if(this.props.center){
            axios.get(url + 'weather?lat=' + this.props.center.lat + '&units=metric&lon=' + this.props.center.lng + '&APPID=' + key)
                .then(response => {
                    if (response.data) {
                        this.setState({
                            city: response.data.name,
                            temp: response.data.main.temp.toFixed(0),
                            wind: response.data.wind.speed.toFixed(0),
                            hum: response.data.main.humidity,
                            icon: iconMap[response.data.weather[0].icon]
                        });
                    } else {
                        location.reload();
                    }

                });
        }
    }

    render() {
        let classes = classnames('wi', this.state.icon);
        let today = new Date().getDay();

        return (
            <div className="flipCard__flipper__front">
                <div className="flipCard__flipper__front__header">
                    <div className="flipCard__flipper__front__header--location">{this.state.city}</div>
                    <div className="flipCard__flipper__front__header--degrees">{this.state.temp}°</div>
                    <div className="clearfix"></div>
                </div>
                <div className="flipCard__flipper__front__icon-weather">
                    <i className={classes}></i>
                </div>
                <div className="flipCard__flipper__front__measure">
                    <div className="flipCard__flipper__front__measure--wind">
                        <div className="flipCard__flipper__front__measure--wind--label">WIND</div>
                        <div className="flipCard__flipper__front__measure--wind--value">{this.state.wind} mph</div>
                    </div>
                    <div className="flipCard__flipper__front__measure--humidity">
                        <div className="flipCard__flipper__front__measure--humidity--label">HUMIDITY</div>
                        <div className="flipCard__flipper__front__measure--humidity--value">{this.state.hum} %</div>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="flipCard__flipper__front__currentDay">
                    <div className={classnames('flipCard__flipper__front__currentDay--monday', { 'currentDay': today === 1 })}>mon</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--tuesday', { 'currentDay': today === 2 })}>tue</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--wednesday', { 'currentDay': today === 3 })}>wed</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--thursday', { 'currentDay': today === 4 })}>thu</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--friday', { 'currentDay': today === 5 })}>fri</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--saturday', { 'currentDay': today === 6 })}>sat</div>
                    <div className={classnames('flipCard__flipper__front__currentDay--sunday', { 'currentDay': today === 7 })}>sun</div>
                    <span className="clearfix"></span>
                </div>
            </div>
        )
    }
}

export default FrontCard;