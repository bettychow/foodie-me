import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './store'
import registerServiceWorker from './registerServiceWorker';
import { fetchLocation } from './actions/index'
import 'bootswatch/dist/materia/bootstrap.min.css'

store.dispatch(fetchLocation())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
