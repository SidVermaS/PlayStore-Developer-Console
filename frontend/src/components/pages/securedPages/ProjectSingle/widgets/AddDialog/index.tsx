import {useState, forwardRef, ForwardRefRenderFunction, useImperativeHandle,useRef} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import semver from 'semver'
import {TextFieldPrimary, FileInput,} from '../../../../../widgets'
import {versionNoYup} from '../../../../../../utilities/forms/yupObject'
import styles from './index.module.scss'

interface AddDialogProps {
    toggle: Function
}

interface AddDialogRefs {
    addVersion: Function
}

const AddDialog:ForwardRefRenderFunction<AddDialogProps,AddDialogRefs> = ({addVersion} ,ref) => {
    useImperativeHandle(ref, ()=>   ({
        toggle:(sentLatestVersionNo: string)=> {
            setOpen(prev=>!prev)
            setLatestVersionNo(sentLatestVersionNo)
        }
    }))
    const fileRef=useRef<any>(null)
    const validationSchema=Yup.object().shape({
        version_no: versionNoYup
    })
    const formik=useFormik({
            initialValues:  {
                version_no: ''
            },
            validationSchema,
            onSubmit:(values)=> {
                if(fileRef.current.getFile())   {
                    const formData=new FormData()
                    formData.append('version_no', values.version_no)
                    formData.append('file',fileRef.current.getFile())
                    addVersion(formData)
                   
                } 
            }
    })

    const [latestVersionNo, setLatestVersionNo]=useState<string>('')
    const [open, setOpen]=useState<boolean>(false)
    const handleClose=()=>  {
        setOpen(false)
        formik.resetForm()
        fileRef.current?.clearFile()
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Version</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New version should be greater than the latest version
                    </DialogContentText>
                    <div className='my-3'>
                    <FileInput ref={fileRef}    />
                    </div>
                    <div className='mb-3'>
                    <TextFieldPrimary name='version_no' type='text' error={formik.errors.version_no} value={formik.values.version_no} onChange={(e: any)=>{
                        
                        formik.handleChange(e)
                        setTimeout(()=>{
                        if(e.target.value.match(/^\d\.\d\.\d$/))  {
                           
                           
                            if(semver.gte(latestVersionNo, e.target.value)) {
                              
                                formik.setErrors({
                                    version_no: 'New version should be greater than the latest one'
                                })
                            }
                        }
                        },1)
                    }} placeholder='1.0.4' label='Version No.'   />  
                    </div>
                </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                formik.handleSubmit()
            }} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          
        </DialogActions>
        </Dialog>
    )
}

export default forwardRef(AddDialog)
