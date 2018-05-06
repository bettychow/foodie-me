import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

class SearchPage extends Component {

  render() {
    
    return(
      <div>
        <Link to={`/${this.props.match.params.username}`}>Back</Link>
        <SearchBox />
        <SearchResults />
      </div>
    )
  }
  

}

const mapStateToProps = state => {
  return ({
    username: state.currentUser.username
  })
}

export default SearchPage