import express from 'express'
import {create,update,fetchAll,fetch,remove,search,download} from '../controllers/project'

const router=express.Router()
router.post('/project',create)
router.put('/project',update)
router.get('/project/all/:user_id',fetchAll)
router.get('/project/single',fetch)
router.delete('/project',remove)
router.get('/project/search',search)
router.post('/project/download',download)

export default router