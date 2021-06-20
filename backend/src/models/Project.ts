import {Schema, model,} from 'mongoose'

import {ProjectI,VersionI} from '../interfaces'

const ProjectScehma=new Schema<ProjectI>({
    _id:    {
        type: Schema.Types.ObjectId,
        required: true
    },
    title:  {
        type: String,
        required: true,
    },
    user_id:    {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    url:    {
        type: String,
        required: true,
        unique: true
    },
    versions:   [
        {            
            version_no: {
                type: String,
                required: true
            },
            created:    {
                type: Date,
                required: true,
                default: Date.now,
            }        
        }
    ],
})
ProjectScehma.index({title: 'text'})
export default model('projects', ProjectScehma)