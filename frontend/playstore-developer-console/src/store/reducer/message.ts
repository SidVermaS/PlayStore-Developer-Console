import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../constants'

import {ActionI} from '../../utilities/interfaces'

const initialState={
    message: null
}

const message=(state=initialState, action: ActionI)=>   {
  
    switch(action.type) {
        case SUCCESS_MESSAGE:
            return {...state, message: action.payload, type: SUCCESS_MESSAGE}
        case ERROR_MESSAGE:
            return {...state, message: action.payload, type: ERROR_MESSAGE}
        default:
            return state
    }
}

export default message