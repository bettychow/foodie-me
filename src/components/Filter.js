import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { filterFavoriteRestaurants } from '../actions/index'

class Filter extends Component {


  toggle = this.toggle.bind(this);
  state = {
    dropdownOpen: false,
    dropDownValue: 'Filter By'
  };

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  changeValue = e => {
    
  this.setState({dropDownValue: e.target.textContent})

  if(this.state.dropDownValue === 'Latest first') {
    
    const restaurants = this.props.restaurants

    const filteredRest = restaurants.filter(restaurant => {
      return restaurant.review
    })

    console.log("FIIIIIILLLLLL",  filteredRest)

    const lastestRest = filteredRest.sort((a,b) => {
      return a.review.created_at > b.review.created_at
    })

    filterFavoriteRestaurants(lastestRest)

  }

  }

  

  

render() {
  const { filterFavoriteRestaurants } = this.props
  console.log('VVVVVVVVVV', this.state.dropDownValue)

  console.log(':::::::::::::', this.props)

  

  

  //this.changeValue = this.changeValue.bind(this)
console.log('DROPDOWN====>', this.state.dropdownOpen)
console.log('DROPDOWN VALUE====>', this.state.dropDownValue)




  return(
    <div>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropDownValue}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={e => this.changeValue(e)}>
            Latest first
          </DropdownItem>
          <DropdownItem onClick={e => this.changeValue(e)}>
            Oldest first
          </DropdownItem>
          <DropdownItem onClick={e => this.changeValue(e)}>
            Reviews available
          </DropdownItem>
          <DropdownItem onClick={e => this.changeValue(e)}>
            Alphabetic Order Ascending
          </DropdownItem>
          <DropdownItem onClick={e => this.changeValue(e)}>
            Alphabetic Order Descending
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Input type="text" />
    </div>
  )
}

}

const mapStateToProps = state => ({
  //restaurants: state.favorites.restaurants
})


const mapDispatchToProps = dispatch => bindActionCreators({
  filterFavoriteRestaurants
}, dispatch)

export default connect(null, mapDispatchToProps)(Filter)