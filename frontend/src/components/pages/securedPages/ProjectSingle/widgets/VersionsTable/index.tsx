import {Table, TableCell, TableRow, TableBody,TableHead,IconButton} from '@material-ui/core'
import {GetApp as GetAppIcon} from '@material-ui/icons'
import moment from 'moment'
import styles from './index.module.scss'

import {timestampFormat} from '../../../../../../utilities/dateTime/dateTimeFormat'

import {postprojectdownloadAPI} from '../../../../../../networks/apis/projectAPI'
import {downloadFile} from '../../../../../../utilities/methods'
const VersionsTable = ({versions, user_id, _id}:any) => {
    const columns:Array<string>=['VERSION','UPLOADED ON','UNIQUE ID','DOWNLOAD',]
   
    const downloadApp=async (version_no: string)=>    {
        try {
            
            const {status, body}=await postprojectdownloadAPI({
                version_no,user_id,_id
            })
            if(status===200)    {
                downloadFile(body)
            }
        }   catch(error)    {
            
        }
    }

    return (
        <div className={styles.table}>
            <Table className={styles.tableHead} stickyHeader>
                <TableHead className={styles.tableRow}>
                    <TableRow className={styles.tableHeadCell}>
                        {columns.map((item)=>(<TableCell>{item}</TableCell>))}
                    </TableRow>
                </TableHead>
                <TableBody> 
                    {versions?.map((item: any)=>(
                            <TableRow key={item._id} className={styles.tableCell}>
                                <TableCell>{item.version_no}</TableCell>
                                <TableCell>{moment(item.created,timestampFormat).format('ll')}</TableCell>
                                <TableCell>{item._id}</TableCell>
                                <TableCell><IconButton  onClick={()=>downloadApp(item.version_no)}><GetAppIcon /></IconButton></TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default VersionsTable
