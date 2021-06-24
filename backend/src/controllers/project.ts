import {Types,} from 'mongoose'
import {Request, Response} from 'express'
import path from 'path'
import fs from 'fs'
import semver from 'semver'
import {uploadFile} from './upload'
import Project from '../models/Project'

export const create=async (req: Request<any>, res: Response<any>)=>    {
    try {     
        const {title,user_id,version_no,url}=req.body
        if(await Project.findOne({url}).select('_id'))    {            
            return res.status(409).json({message: 'App\'s URL is already used'})
        }   else    {
            const project=new Project({
                _id: new Types.ObjectId,
                title,
                user_id,
                url,
                versions:[{
                    version_no: version_no,
                }]
            })
            req.body._id=project._id    
            const fileUrl:String=await uploadFile(req)
            if(fileUrl) {
              
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
        const {_id, version_no,}=req.body
        const versions=await Project.findById(_id, { _id, versions: {$slice: -1} })
        const lastVersionNo=versions?.['versions']?.[0]['version_no']
        if(semver.lt(lastVersionNo, version_no))    {
         
            const fileUrl:String=await uploadFile(req)
            if(fileUrl) {
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
        let {user_id}=req.params
        user_id=Types.ObjectId(user_id)
        const projects=await Project.aggregate([
            {
                $project:   {
                    _id: 1,
                    title: 1,
                    url: 1,
                    user_id: 1,
                    total_versions: {
                        $size: '$versions',
                    },
                    latest_version:   {
                        $arrayElemAt: ['$versions', -1]
                    }
                }
            },
            {
                $match: {
                    user_id
                }
            }
        ])

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
        let {user_id, _id}=req.query
        
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
        const {_id,user_id}=req.query
        const project = await Project.findByIdAndDelete(_id)
        if(project) {
            fs.rmdir(`${path.resolve()}\\${user_id}\\${_id}`,()=>    {
                console.log(`${path.resolve()}\\${user_id}\\${_id} is removed`)
            })
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

        const projects=await Project.find({user_id,title: {$regex: `^${search_text}`, $options: 'i'}}).select('_id title')
        if(projects)    {
            return res.status(200).json({message: 'Successfully searched the projects', projects})
        }   else    {
            return res.status(404).json({message: 'No projects found'})
        }
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const download=async (req: Request<any>, res: Response<any>)=>   {
    try {
        const {user_id, _id, version_no}=req.body

        const project = await Project.findById(_id)
        if(project) {
            const fileLocation=`${path.resolve()}\\uploaded_apps\\${user_id}\\${_id}\\${version_no}\\app.apk`      
        return res.download(fileLocation)
        }   else    {
            return res.status(404).json({message: 'Project didn\'t found'})
        }

       
    }   catch(error)    {
        return res.status(500).json({message: 'Process failed', error})
    }
}
