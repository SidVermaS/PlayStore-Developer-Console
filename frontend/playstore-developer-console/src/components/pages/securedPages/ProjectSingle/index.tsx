import {useState, useEffect, useRef} from 'react'
import {connect} from 'react-redux'
import {useLocation, useHistory} from 'react-router-dom'
import moment from 'moment'

import styles from './index.module.scss'
import {LongButton,} from '../../../widgets'
import {getprojectsingleAPI,patchprojectAPI,deleteprojectAPI} from '../../../../networks/apis/projectAPI'

import VersionsTable from './widgets/VersionsTable'
import {timestampFormat} from '../../../../utilities/dateTime/dateTimeFormat'
import {ProjectSingleI} from '../../../../utilities/interfaces'
import {setMessage} from '../../../../store/actions'
import {path} from '../../../../PageRoutes/routes'
import {SUCCESS_MESSAGE, ERROR_MESSAGE} from '../../../../store/constants'
import DeleteDialog from './widgets/DeleteDialog'
import AddDialog from './widgets/AddDialog'


const ProjectSingle = (props: any) => {
    const [project, setProject]=useState<ProjectSingleI>()
    const location=useLocation()
    const history=useHistory()
    const deleteDialogRef=useRef<any>(null)
    
    const addDialogRef=useRef<any>(null)

    const addVersion=async (formData: FormData)=> {
        try {
            console.log('~~~ addVersion: ',formData, ' pj: ',project)
            formData.append('_id', project?._id!)
            const {status, body}=await patchprojectAPI(formData)
            if(status===200)    {
                props.setMessage({type: SUCCESS_MESSAGE, text: body.message})
                history.push(path.Home)
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }

        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    }

    const deleteProject=async ()=>  {
        try {
          
            const {status, body}=await deleteprojectAPI(project?._id)
            if(status===200)    {
                props.setMessage({type: SUCCESS_MESSAGE, text: body.message})
                history.push(path.Home)
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }

        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    }

    const fetchData=async ()=>    {
        try {
            const pathname:string=location.pathname
            const {status, body}=await getprojectsingleAPI(`user_id=${props.user._id}&_id=${pathname.substring(pathname.lastIndexOf('/')+1)}`)
            if(status===200)    {
                setProject(body.project)
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }

        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    }
    useEffect(()=>{
        fetchData()
    },[])

    return (
        <div className={styles.background}>
            <DeleteDialog ref={deleteDialogRef} deleteProject={deleteProject}   />
            <AddDialog ref={addDialogRef} addVersion={addVersion}   />
            <div className={styles.heading}>
                <p className={styles.title}>{project?.title}</p>
            </div>
            <div className={styles.body}>
                <div className={`${styles.actions} d-flex justify-content-between`}>
                    <div className='d-flex'>
                        <div className={`align-self-center mr-5 ${styles.headingTitle}`}>
                            APK
                        </div>
                        <div className={styles.uploadNewAPKBtn}>
                           <LongButton title='Upload new APK' onClick={()=>addDialogRef.current?.toggle(project?.versions[project?.versions.length-1].version_no)}    /> 
                        </div>
                    </div>
                    <div className={styles.deleteProjectBtn}>
                        <LongButton title='DELETE PROJECT' onClick={deleteDialogRef.current?.toggle}    /> 
                    </div>
                </div>
                <div className='d-flex mt-4'>
                    <div className={styles.headingTitle}>
                        CURRENT APK
                    </div>
                    <div className={`ml-4 ${styles.publishedOn}`}>
                        published on <span className={styles.dateTime}>{moment(project?.versions[project?.versions.length-1].created, timestampFormat).format('DD MMM YYYY HH:mm:ss')}</span>
                    </div>
                </div>
                <div className={styles.horizontalDivider}></div>

                <div className='row'>
                    <div className='col-3'>
                        <div className={styles.subHeading}>
                            Package name
                        </div>
                        <div className={styles.subHeadingDetails}>
                            {project?.url}
                        </div>
                    </div>
                    <div className='col-3'>
                        <div className={styles.subHeading}>
                            Latest version
                        </div>
                        <div className={styles.subHeadingDetails}>
                            v{project?.versions[project?.versions.length-1].version_no}
                        </div>
                    </div>
                </div>
                <div className={styles.horizontalDivider}></div>
                <div className={styles.headingTitle}>
                    PREVIOUS APKS
                </div>
                <VersionsTable versions={project?.versions}  />
            </div>
        </div>
    )
}
const mapStateToProps=({user}:any)=>({
    user: user.user
})
export default connect(mapStateToProps, {setMessage})(ProjectSingle)
