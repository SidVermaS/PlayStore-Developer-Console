import mongoose,{Types,} from 'mongoose'
import {Request, Response} from 'express'
import semver from 'semver'
import {ProjectI,VersionI} from '../interfaces'
import {uploadFile} from './upload'
import Project from '../models/Project'

export const create=async (req: Request<any>, res: Response<any>)=>    {
    try {     
        const {title,user_id,version_no,url}=req.body
        if(await Project.findOne({url}).select('_id'))    {            
            return res.status(409).json({message: 'App\'s URL is already used'})
        }   else    {
            const fileUrl:String=await uploadFile(req)
            if(fileUrl) {
                const project=new Project({
                    _id: new Types.ObjectId,
                    title,
                    user_id,
                    url,
                    versions:[{
                        version_no: version_no,
                        // date: 
                    }]
                })
                const savedProject=await project.save()
                if(savedProject)    {
                    return res.status(201).json({message: 'Successfully saved the project', project: savedProject})
                }   else    {
                    return res.status(400).json({message: 'Failed to save the project'})
                }
            }   else    {
                return res.status(400).json({message: 'Failed to save the project'})
            }
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const update=async (req: Request<any>, res: Response<any>)=>  {
    try {
        const {_id, version_no}=req.body

        const versions=await Project.findById(_id, { _id, versions: {$slice: -1} })
        const lastVersionNo=versions?.['versions']?.[0]['version_no']
        if(semver.lt(lastVersionNo, version_no))    {
            const updatedProject=await Project.findByIdAndUpdate(_id, {
                $push:  {
                    versions:   {
                        version_no
                    }
                }
            })
            if(updatedProject)  {
                return res.status(200).json({message: 'Successfully updated the project', project: updatedProject})
            }   else    {
                return res.status(400).json({message: 'Failed to update the project'})
            }
        }   else    {
            return res.status(400).json({message: 'New version should be lesser than the old version', })
        }
        
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const fetchAll=async (req: Request<any>, res: Response<any>)=>   {
    try {
        const {user_id}=req.params
        const projects = await Project.find({user_id}).select('_id title url user_id')
        if(projects)    {
            return res.status(200).json({message: 'Successfully fetched the projects', projects})
        }   else    {
            return res.status(404).json({message: 'Failed to fetch the projects'})
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const fetch=async (req: Request<any>, res: Response<any>)=>  {
    try {
        const {user_id, _id}=req.query
        const project = await Project.find({_id, user_id})
        if(project) {
            return res.status(200).json({message: 'Successfully fetched the project', project:project[0]})
        }   else    {
            return res.status(404).json({message: 'Project didn\'t found'})
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const remove=async (req: Request<any>, res: Response<any>)=>  {
    try {
        const {_id}=req.params
        const project = await Project.findByIdAndDelete(_id)
        if(project) {
            return res.status(200).json({message: 'Successfully deleted the project', project})
        }   else    {
            return res.status(404).json({message: 'Project didn\'t found'})
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const search=async (req: Request<any>, res: Response<any>)=> {
    try {
       
        const {search_text, user_id}=req.query

        const projects=await Project.find({$text: {$search: search_text?.toString() || ''},user_id}).select('_id title')
        if(projects)    {
            return res.status(200).json({message: 'Successfully searched the projects', projects})
        }   else    {
            return res.status(404).json({message: 'No projects found'})
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}