import path from 'path'
import fs from 'fs'
import {Request,Response} from 'express'
import {UploadedFile} from 'express-fileupload'

export const uploadFile=async (req: Request<any>)=>    {
    try {
        const file=req.files?.file as UploadedFile
        
        const folderLocation=path.join(path.resolve(), `/uploaded_apps/${req.body.user_id}/${req.body._id}/${req.body.version_no}`)
        await fs.mkdirSync(folderLocation,{recursive: true})
        const fileLocation=`${folderLocation}/app.apk`
        await file.mv(fileLocation)
        return fileLocation
    }   catch(error)    {
        return ''
    }
}

