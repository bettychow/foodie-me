import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import { getUserInfo, setMapLocation } from './actions/index'
import 'bootswatch/dist/materia/bootstrap.min.css'
import jwtDecode from'jwt-decode'

const token = localStorage.getItem('authorization')
console.log('TOKKKKKKKKK', token)
  if(token) {
    const decoded = jwtDecode(token)
    const userId = decoded.sub.id
    const username = decoded.sub.username
    store.dispatch(getUserInfo(username))
  }

const coordinatesObj = { lat: 37.0902, lng: -95.7129}

// store.dispatch(setMapLocation(coordinatesObj))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
