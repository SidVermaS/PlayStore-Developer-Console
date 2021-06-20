import {Schema, model,} from 'mongoose'
import {UserI, } from '../interfaces'

const UserSchema=new Schema<UserI>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name:   {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true,
    },
    password:   {
        type: String,
        required: false,        
    },
    project_ids:    [
        { type: Schema.Types.ObjectId, ref: 'projects' },
    ]
})

export default model('users', UserSchema)