import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import { getUserInfo } from './actions/index'
import 'bootswatch/dist/materia/bootstrap.min.css'
import jwtDecode from'jwt-decode'

const token = localStorage.getItem('authorization')
  if(token) {
    const decoded = jwtDecode(token)
    const userId = decoded.sub.id
    const username = decoded.sub.username
    store.dispatch(getUserInfo(username))
  }



// store.dispatch(fetchLocation())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
