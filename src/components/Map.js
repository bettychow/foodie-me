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


// const AnyReactComponent = ({ text }) => <div  style={greatPlaceStyle} onMouseEnter={this.handleMouseHover}
// onMouseLeave={this.handleMouseHover}>{text}</div>;
 
class Map extends Component {

  
  // static defaultProps = {
  //   // center: {lat: this.props.favorites[0]? this.props.favorites[0].lat: 37.3230, lng: this.props.favorites[0]? this.props.favorites[0].lng: -122.0322 },
  //   center: {lat: 37.3230, lng: -122.0322},
  //   zoom: 12
  // };

  handleMouseHover = this.handleMouseHover.bind(this);
  state = {
    isHovering: false,
    lat: 37.7749,
    lng: -122.4194,
    center: {lat: 37.0902, lng: -95.7129},
    zoom: 4
  };

  componentDidMount() {

    this.props.getUserRestaurants()
    console.log('OOOOOOOOOO', this.props)

    // if(this.props.userFavorites[0]) {
    //   this.setState({
    
        
    //       lat: Number(this.props.userFavorites[0].lat),
    //       lng: Number(this.props.userFavorites[0].lng)
      
        
    //   })
    // }
    
  }


handleMouseHover() {
  this.setState(this.toggleHoverState);
}

toggleHoverState(state) {
  return {
    isHovering: !state.isHovering,
  };
}



 
  render() {

    console.log('PPPPPPPPPP',this.props.userFavorites)

    console.log('TTTTTTT', this.state.center)

    

    const RestaurantOnMap = ({ text }) => 
    <div>
      <div  
        style={greatPlaceStyle} 
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
      </div>
      {this.state.isHovering && <div>{text}</div>}
    </div>;

    const { userFavorites, getUserRestaurants } = this.props

    const displayFavoritesOnMap = userFavorites.map(restaurant => {
      return <RestaurantOnMap key={restaurant.yelp_id} lat={restaurant.lat} lng={restaurant.lng} text={restaurant.restaurant_name}/>
    })
    
    console.log('?????????', userFavorites[0])
    const lat = Number(userFavorites[0].lat)
    const lng = Number(userFavorites[0].lng)

    const coordinatesObj = {lat, lng }

     console.log('CCCCCCC', coordinatesObj)

   

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAIfMFqTk-qZu7-bPuH2-haZC1lSzmEn7c' }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
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

const mapDispatchToProps = dispatch => bindActionCreators({
  getUserRestaurants
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Map)