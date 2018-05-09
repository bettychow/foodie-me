import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
 

const MARKER_SIZE = 10;
const greatPlaceStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE / 2,
  color: 'red',
  backgroundColor: 'red',
  borderRadius: 50,
}


// const AnyReactComponent = ({ text }) => <div  style={greatPlaceStyle} onMouseEnter={this.handleMouseHover}
// onMouseLeave={this.handleMouseHover}>{text}</div>;
 
class Map extends Component {

  
  static defaultProps = {
    center: {lat: 37.3230, lng: -122.0322},
    zoom: 12
  };

  handleMouseHover = this.handleMouseHover.bind(this);
  state = {
    isHovering: false,
  };


handleMouseHover() {
  this.setState(this.toggleHoverState);
}

toggleHoverState(state) {
  return {
    isHovering: !state.isHovering,
  };
}
 
  render() {

    const AnyReactComponent = ({ text }) => 
    <div>
      <div  
        style={greatPlaceStyle} 
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
      </div>
      {this.state.isHovering && <div>{text}</div>}
    </div>;

    const { userFavorites } = this.props

    const displayFavoritesOnMap = userFavorites.map(restaurant => {
      return <AnyReactComponent key={restaurant.yelp_id} lat={restaurant.lat} lng={restaurant.lng} text={restaurant.restaurant_name}/>
    })

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIfMFqTk-qZu7-bPuH2-haZC1lSzmEn7c' }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        {/* <AnyReactComponent
          lat={37.7876}
          lng={-122.3966}
          text={'Galvanize'}
        /> */}
      
      {displayFavoritesOnMap}
      
      
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in map', state)

  return({
    userFavorites: state.favorites.restaurants
  })
}


export default connect(mapStateToProps, null)(Map)