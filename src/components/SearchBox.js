import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputSearch, search } from '../actions/index'
import SearchResults from './SearchResults'

class SearchBox extends Component {

  state = {
    searchString: '',
    location: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
      console.log('eeeeeeeevent in Search Box', e.target.input)

      this.props.search(this.state.searchString, this.state.location)
      this.props.handleClear()
  }

  handleSearchBox = (e) => {
    this.setState({
      searchString: e.target.value
    })
  }

  handleLocation = e => {
    this.setState({
      location: e.target.value
    })
  }

  getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
       console.log("Geolocation is not supported by this browser.")
    }
}

  showPosition = (position) => {
  console.log( position.coords.latitude, position.coords.longitude)
}

render () {

  const { search } = this.props


  return (
    <div className="search-box">
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup>
          <Label for="search-box">What do you want to eat?</Label>
          <Input value={this.state.searchString} id="search-box" placeholder="e.g. japanese, pizza, chinese, american" onChange={e => this.handleSearchBox(e)}/>
        </FormGroup>
        <FormGroup>
          <Label for="location">Enter City and State</Label>
          <Input type="text" id="location" placeholder="e.g. San Francisco CA" onChange={e => this.handleLocation(e)}></Input>
        </FormGroup>
      <Button className="mr-3" type="submit" color="primary">Search</Button>
      <Button onClick={this.props.handleClear}>Clear Results</Button>
      </Form>
      
    </div>
  )
}



  
}


const mapStateToProps = state => {
  console.log('state', state)
  return ({
    //searchString: state.search.content,
    restaurants: state.search.businesses
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  //inputSearch,
  search

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
