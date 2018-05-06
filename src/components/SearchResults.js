import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputSearch, addToFavorite } from '../actions/index'

const SearchResults = ({ restaurants, addToFavorite }) => {

  const handleFavoriteToggle = (e) => {
    console.log('eeeeeee', e.target.parentNode)

    if(!e.target.parentNode.classList.contains('chosen')) {
      e.target.parentNode.classList.add('chosen')
    } else {
      e.target.parentNode.classList.remove('chosen')
    }

    if(e.target.parentNode.classList.contains('chosen')) {
      e.target.innerHTML = '&hearts;'
    } else {
      e.target.innerHTML = '&#9825;'
    }
      
    console.log(e.target.parentNode.getAttribute('lat'))
    console.log('wwwww', e.target.parentNode.children)

    const restaurantInfo = e.target.parentNode.children
    const name = restaurantInfo[1].innerHTML
    const image = restaurantInfo[0].src
    const address = restaurantInfo[2].innerHTML
    const phone = restaurantInfo[3].innerHTML
    const lat = e.target.parentNode.getAttribute('lat')
    const lng = e.target.parentNode.getAttribute('lng')
    const id = e.target.parentNode.getAttribute('id')

    const restaurantObj = {
      name,
      image,
      address,
      phone,
      lat,
      lng,
      id
    }

    console.log('hearttttttt', e.target.innerHTML)
    if(e.target.innerHTML === '♥') {
      addToFavorite(restaurantObj)
    }
  }

 

  const displayRestaurants = restaurants.map(restaurant => {
console.log('rrrrrrr', restaurant)
    return <li key={restaurant.id} id={restaurant.id} className="restaurant" lat={restaurant.coordinates.latitude} lng={restaurant.coordinates.longitude}>
              <img className="restaurant-img" src={restaurant.image_url} />
              <h3>{restaurant.name}</h3>
              <p>{`${restaurant.location.display_address[0]} ${restaurant.location.display_address[1]}`}</p>
              <p>{restaurant.display_phone}</p>
              <span className="heart" onClick={e => handleFavoriteToggle(e) }>&#9825;</span>
            
           </li>
  })

   return (
     <ul>
      {displayRestaurants}

     </ul>
   )
   
}


const mapStateToProps = state => {
  console.log('state', state)
  return ({
    restaurants: state.search.businesses
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputSearch,
  addToFavorite

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)
