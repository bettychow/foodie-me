import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 

const MARKER_SIZE = 20;
const greatPlaceStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE / 2,
  color: 'red',
  backgroundColor: 'red',
  borderRadius: 50
}


const AnyReactComponent = ({ text }) => <div  style={greatPlaceStyle}>{text}</div>;
 
class Map extends Component {
  static defaultProps = {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 12
  };
 
  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIfMFqTk-qZu7-bPuH2-haZC1lSzmEn7c' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={37.7876}
          lng={-122.3966}
          text={'Galvanize'}
        />
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = () => {
  
}
export default Map