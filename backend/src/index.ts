import express from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routers/auth'
import projectRouter from './routers/project'
import {verifyToken} from './controllers/auth'

const app=express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())

app.use('/api', authRouter)
app.use('/api', verifyToken, projectRouter)


const PORT=process.env.PORT || 5000

mongoose.connect('mongodb+srv://new-user:JSoV1YXtUvVPOLa1@cluster0.wtfkm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, }).then(()=>{
    console.log('Connected to MongoDB')
    app.listen(PORT, ()=>   {
        console.log('Connected to DB')
    })
}).catch(err=>console.log(err))
