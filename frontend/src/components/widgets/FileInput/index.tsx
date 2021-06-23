import {  
    useState,
    ForwardRefRenderFunction,
    useRef,
    forwardRef,
    useImperativeHandle,
    } from 'react';
import {Button,Divider} from '@material-ui/core'
import styles from './index.module.scss'

interface FileInputForwardProps  {
    getFile: Function
    clearFile: Function
}
interface FileInputForwardRefs  {
  
}
const FileInput:ForwardRefRenderFunction<FileInputForwardProps, FileInputForwardRefs> = (props: any, ref) => {
    useImperativeHandle(ref, ()=>({
        getFile: ()=>   {
            return selectedFile
        },
        clearFile: ()=> {
            setSelectedFile(null)
            setFileTitle('No app selected')
        }
    }))

    const fileRef=useRef<HTMLInputElement>(null)
    const [selectedFile,setSelectedFile]=useState<any>(null)
    const [fileTitle, setFileTitle]=useState<String>('No app selected')
    const onChange=(e: any)=>   {
        if(e.target.files[0])  {
            setSelectedFile(e.target.files[0])
            setFileTitle(e.target.files[0].name)
        }
    }

    return (
        <>
        <div className={`${styles.background} d-flex align-items-center`}>
            <input ref={fileRef} type='file' hidden onChange={onChange} accept='.apk'   />
            <div className={`${styles.browseBtn} mr-2`}>
                <Button onClick={()=>fileRef.current?.click()}>Browse</Button>
            </div>
            <div className={styles.fileTitle}>{fileTitle}</div>
        </div>
        <div className={`${styles.fileInputDivider} mt-2`}>
            <Divider/>
        </div>
        </>
    )
}

export default forwardRef(FileInput)
