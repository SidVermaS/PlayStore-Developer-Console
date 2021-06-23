import md5 from 'md5'
import {Types} from 'mongoose'
import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import {UserI} from '../interfaces'

export const register=async (req: Request<UserI>, res: Response<any>)=>    {
    try {
        const {name,email,password}:UserI=req.body
        if(await User.findOne({email}))    {
            return res.status(409).json({message: 'Email already registered'})            
        }   else    {
            const user=new User({
                _id: new Types.ObjectId,
                name,
                email,
                password: md5(password.toString())
            })
            const savedUser=await user.save()
            if(savedUser)   {
                return res.status(201).json({ message: 'Successfully registered!', })
            }   else    {
                return res.status(400).json({message: 'Failed to register'})
            }
        }
    }   catch(error)  {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const login=async (req: Request<UserI>, res: Response<any>)=>   {
    try {
        const {email,password}:UserI=req.body            
          
        if(await User.findOne({email}))    {
            const user=await User.findOne({email, password: md5(password.toString())}).select('_id name email')
            const privateKey='secretkey'
            const token=jwt.sign({user}, privateKey)
            return res.status(200).json({message: 'Successfully logged in', user, token})
        }   else    {
            return res.status(404).json({message: 'Email isn\'t registered'})         
        }
    }   catch(error)  {
        return res.status(500).json({message: 'Process failed', error})
    }
}

export const verifyToken=(req: Request<any>, res: Response<any>, next: any)=>  {
    const bearerHeader=req.headers['authorization']?.toString()
    
    if(bearerHeader)    {
        const bearerToken=bearerHeader.split(' ')[1]
        const privateKey='secretkey'
        jwt.verify(bearerToken, privateKey, (error, authData)=>   {
            if(error)   {
                return res.status(401).json({message: 'Unauthorized access'})
            }   else    {
                next()
            }
        })
    }   else    {
        return res.status(401).json({message: 'Unauthorized access'})
    }
}