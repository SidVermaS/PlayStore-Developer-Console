import cookies from 'react-cookies'
import {SET_USER, REMOVE_USER} from '../constants'
import {ActionI} from '../../utilities/interfaces'

const initialState={
    user: null
}

const user=(state=initialState, action: ActionI)=>  {
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload}
        case REMOVE_USER:
            localStorage.removeItem('user')
            cookies.remove('token')
            try {
                return {...state, user: null}
            }   finally {
                action.payload()
            }
        default:
            return state
    }
}

export default user