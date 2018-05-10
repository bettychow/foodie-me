import React, { Component } from 'react';
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react';
import { bindActionCreators } from 'redux'
import { getUserRestaurants } from '../actions/index'
 

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

 
class Map extends Component {

  handleMouseHover = this.handleMouseHover.bind(this);
  state = {
    isHovering: false,
    lat: 37.7749,
    lng: -122.4194,
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 4
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

    const RestaurantOnMap = ({ text }) => 
    <div>
      <div  
        style={greatPlaceStyle} 
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
      </div>
      {this.state.isHovering && <div style={{color: 'red'}}>{text}</div>}
    </div>;

    const { userFavorites, getUserRestaurants } = this.props

    const displayFavoritesOnMap = userFavorites.map(restaurant => {
      return <RestaurantOnMap key={restaurant.yelp_id} lat={restaurant.lat} lng={restaurant.lng} text={restaurant.restaurant_name}/>
    })
    
    const lat = Number(userFavorites[0].lat)
    const lng = Number(userFavorites[0].lng)

    const coordinatesObj = {lat, lng }


    return (

      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIfMFqTk-qZu7-bPuH2-haZC1lSzmEn7c' }}
        center={this.props.coordinates}
        zoom={this.props.zoom}
      >
      
      {displayFavoritesOnMap}
       
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in map', state)

  return({
    userFavorites: state.favorites.restaurants,
    coordinates: state.mapLocation.coordinates,
    zoom: state.mapLocation.zoom
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserRestaurants
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Map)