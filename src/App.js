import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBox from './components/SearchBox'
import Map from './components/Map'
import SearchResults from './components/SearchResults'
import FavoriteList from './components/FavoriteList'
import Main from './components/Main'
import Landing from './components/Landing'
import SearchPage from './components/SearchPage'
import Review from './components/Review'
import SignUp from './components/SignUp'
import Login from './components/Login'
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import WriteReview from './components/WriteReview';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={SignUp} />
            <Route path='/searchpage/:username' component={SearchPage} />
            <Route exact path='/reviewform/:restaurant_id/:user_id' component={WriteReview}/>
            <Route  exact path='/:username' component={Main} />
            <Route path='/:username/:reviewid' component={Review} />
            
          </Switch>
        </div>
        
      </Router>
    );
  }
}

export default App;
