import {SET_USER, REMOVE_USER} from '../constants/user'

const save=(user: string)=>(dispatch: Function)=>   {
    dispatch({type: SET_USER, payload: user})
}

const remove=(navigate: Function)=>(dispatch: Function)=>   {
    dispatch({type: REMOVE_USER, payload: navigate})
}

export {save, remove}