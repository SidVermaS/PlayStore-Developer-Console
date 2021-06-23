import {applyMiddleware,compose,createStore} from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

export default createStore(reducer, compose(applyMiddleware(thunk)))