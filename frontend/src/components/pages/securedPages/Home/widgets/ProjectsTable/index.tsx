import {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {Table, TableCell, TableRow, TableBody,TableHead,} from '@material-ui/core'
import {path} from '../../../../../../PageRoutes/routes'
import {setMessage} from '../../../../../../store/actions'
import {getprojectallAPI} from '../../../../../../networks/apis/projectAPI'
import {ERROR_MESSAGE} from '../../../../../../store/constants'
import {ProjectTableI} from '../../../../../../utilities/interfaces'
import {timestampFormat} from '../../../../../../utilities/dateTime/dateTimeFormat'
import moment from 'moment'
import styles from './index.module.scss'
import APKLogoImage from '../../../../../../assets/images/apk_logo.png'
const ProjectsTable = (props: any) => {
    const [projects, setProjects]=useState<Array<ProjectTableI>>([])
    const history=useHistory()
    const columns:Array<string>=['APP NAME','PRICE','LATEST VERSION','CREATED','TOTAL VERSIONS','PACKAGE URL','STATUS']
    const fetchData=async ()=>    {
        try {
            const {status, body}=await getprojectallAPI(props.user._id)
            if(status===200)    {
                setProjects(body?.projects)
            }   else    {
                props.setMessage({type: ERROR_MESSAGE, text: body.message})
            }
        }   catch(error)    {
            props.setMessage({type: ERROR_MESSAGE, text: 'Client side error'})
        }
    }

    useEffect(()=>  {
        fetchData()
    }, [])

    return (
        <div className={styles.table}>
            <Table className={styles.tableHead} stickyHeader>
                <TableHead className={styles.tableRow}>
                    <TableRow className={styles.tableHeadCell}>
                        {columns.map((item)=>(<TableCell>{item}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody> 
                    {projects.map((item)=>(
                        <TableRow key={item._id} className={styles.tableCell} onClick={()=>history.push(`${path.ProjectSingle.substring(0, path.ProjectSingle.lastIndexOf('/'))}/${item._id}`)}>
                            <TableCell>
                                <div className='d-flex'>                           
                                <div className='mr-3'><img className={styles.appLogoImage} src={APKLogoImage}/></div>
                                
                                <div className='text-center'>{item.title}</div>     
                                </div>
                                </TableCell><TableCell>Free</TableCell><TableCell>{item.latest_version.version_no}</TableCell><TableCell>{moment(item.latest_version.created,timestampFormat).format('ll')}</TableCell><TableCell>{item.total_versions}</TableCell><TableCell>{item.url}</TableCell><TableCell>Published</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const mapStateToProps=({user}:any)=>  ({
    user: user.user
})

export default connect(mapStateToProps, {setMessage,})(ProjectsTable)
