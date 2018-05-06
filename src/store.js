import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducers from './reducers'

const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware)
)

export default store