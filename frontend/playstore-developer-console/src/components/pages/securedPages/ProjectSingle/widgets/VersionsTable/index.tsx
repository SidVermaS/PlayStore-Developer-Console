import {useState, } from 'react'

import {Table, TableCell, TableRow, TableBody,TableHead,} from '@material-ui/core'
import moment from 'moment'
import styles from './index.module.scss'

import {timestampFormat} from '../../../../../../utilities/dateTime/dateTimeFormat'

const VersionsTable = ({versions}:any) => {
    const columns:Array<string>=['VERSION','UPLOADED ON','UNIQUE ID','DOWNLOAD',]
   
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
                                <TableCell>DOWNLOAD</TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default VersionsTable
