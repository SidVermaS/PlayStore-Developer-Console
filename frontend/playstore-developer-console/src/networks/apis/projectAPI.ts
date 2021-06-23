import api from '../api'
import {projectsearch,project,projectall,projectsingle} from '../urls'
export const getprojectsearchAPI=async (values: any)=>{
    try {
        return await api.get(`${projectsearch}?${values}`)
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

export const postprojectAPI=async (values: any)=>{
    try {
        return await api.post(project,values)
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
export const patchprojectAPI=async (values: any)=>{
    try {
        return await api.put(project,values)
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
export const getprojectallAPI=async (value: any)=>{
    try {
        return await api.get(`${projectall}/${value}`)
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
export const getprojectsingleAPI=async (values: any)=>{
    try {
        return await api.get(`${projectsingle}?${values}`)
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
export const deleteprojectAPI=async (value: any)=>{
    try {
        return await api.delete(`${project}/${value}`)
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