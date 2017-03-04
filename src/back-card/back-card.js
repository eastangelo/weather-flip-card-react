import React, {Component} from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import './back-card.css';

const GeolocationExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={12}
        center={props.center}
    >
        {props.center && (
        <Marker position={props.center}/>
        )}
    </GoogleMap>
));

class BackCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstRender: true
        };
        this.loadDataFromProps = this.loadDataFromProps.bind(this);
    }

    componentDidMount() {
        this.setState({ isFirstRender: false });
    }

    componentWillReceiveProps(){
        this.setState({ isFirstRender: true });
    }

    componentDidUpdate(){
        if(this.state.isFirstRender){
            this.loadDataFromProps();
            this.setState({ isFirstRender: false });
        }
    }

    loadDataFromProps() {
        if(this.props.center){
            if (this.isUnmounted) {
                return;
            }
            this.setState({
                center: {
                    lat: this.props.center.lat,
                    lng: this.props.center.lng,
                }
            });
        }
    }

    render() {
        return (
            <div className="flipCard__flipper__back">
                <GeolocationExampleGoogleMap
                    containerElement={
                        <div style={{ height: `100%` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    center={this.state.center}
                />
            </div>
        );
    }
}

export default BackCard;