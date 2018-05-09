import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import jwtDecode from'jwt-decode'
import SearchBox from './SearchBox'
import SearchResults from './SearchResults'

class SearchPage extends Component {

  state = {
    isAuth: false
  }

  componentDidMount() {
    console.log('username from params in Search page', this.props.match.params.username)
    //const username = this.props.match.params.username
    //this.props.getUserInfo(username)

    const token = localStorage.getItem('authorization')

    if(token) {
      const decoded = jwtDecode(token)
      const userId = decoded.sub.id
      const username = decoded.sub.username

      if(username === this.props.match.params.username ) {
        this.setState({
          isAuth: true
        })
      }
    }
  }

  render() {
    
    return(
      <div>
        <Link to={`/${this.props.match.params.username}`}>Back</Link>
        <SearchBox />
        <SearchResults isAuth={this.state.isAuth} username={this.props.match.params.username} />
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