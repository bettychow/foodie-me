import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { inputSearch, search } from '../actions/index'
import SearchResults from './SearchResults'

const SearchBox = ({ searchString, inputSearch, search }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
      console.log('eeeeeeeevent in Search Box', e.target.input)

      search(searchString)
  }

  const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
       console.log("Geolocation is not supported by this browser.")
    }
}

  const showPosition = (position) => {
  console.log( position.coords.latitude, position.coords.longitude)
}

  return (
    <div>
      <Form onSubmit={e => handleSubmit(e)}>
        <FormGroup>
          <Label for="search-box">What do you want to eat?</Label>
          <Input value={searchString} id="search-box" onChange={e => inputSearch(e.target.value)}/>
        </FormGroup>
      
      <Button className="mr-3" type="submit" color="primary">Search</Button>
      </Form>
      <Button onClick={getLocation}></Button>
      
    </div>
  )
}


const mapStateToProps = state => {
  console.log('state', state)
  return ({
    searchString: state.search.content,
    restaurants: state.search.businesses
  })
}

const mapDispatchToProps = dispatch => bindActionCreators({
  inputSearch,
  search

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)
