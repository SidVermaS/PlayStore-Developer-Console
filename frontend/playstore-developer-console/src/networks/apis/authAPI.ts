import api from '../api'
import {authlogin,authregister} from '../urls'
export const postauthloginAPI=async (user: any)=>{
    try {
        return await api.post(authlogin, user)
        .then(response=>{
                return { status: response.status, body: response.data }

        }).catch(err=>  {
            return { status: err.response.status, body: err.response.data }
        })
    }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
export const postauthregisterAPI=async (user: any)=>{
    try {
        return await api.post(authregister, user)
        .then(response=>{
                return { status: response.status, body: response.data }

        }).catch(err=>  {
            return { status: err.response.status, body: err.response.data }
        })
    }
    catch(err)  {
        return { status: 500, body: 'Failed to connect'}
    }
}
