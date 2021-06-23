
const setMessage=(message: any)=>(dispatch: Function)=> {

    dispatch({type: message.type, payload: message.text})
}

export {setMessage}