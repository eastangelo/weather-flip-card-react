import React, {Component} from 'react';
import classnames from 'classnames';
import axios from 'axios';
import FrontCard from '../front-card/front-card';
import BackCard from '../back-card/back-card';
import './card.css';

const geolocation = (
    navigator.geolocation ?
        navigator.geolocation :
        ({
            getCurrentPosition(success, failure) {
                failure(`Your browser doesn't support geolocation.`);
            },
        })
);

class WeatherWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            lat: null,
            lng: null
        };
        this.flipCard = this.flipCard.bind(this);
    }

    flipCard() {
        if (this.state.active) {
            this.setState({active: false});
        } else {
            this.setState({active: true});
        }
    }

    isUnmounted = false;

    componentDidMount() {

        geolocation.getCurrentPosition((position) => {
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
            });

        }, (err) => {
            //FAILED
            console.log(err);
            if (this.isUnmounted) {
                return;
            }
            axios.get('http://ipinfo.io')
                .then(response => {
                    let coords = response.data.loc.split(",");
                    let lat = parseFloat(coords[0]);
                    let lng = parseFloat(coords[1]);
                    this.setState({
                        center: {
                            lat: lat,
                            lng: lng,
                        }
                    });
                });
        });
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    render() {
        let classes = classnames('flipCard', {flip: this.state.active});
        return (
            <div className={classes} onClick={this.flipCard}>
                <div className="flipCard__flipper">
                    <FrontCard center={this.state.center}/>
                    <BackCard center={this.state.center}/>
                </div>
            </div>
        );
    }
}

export default WeatherWidget;