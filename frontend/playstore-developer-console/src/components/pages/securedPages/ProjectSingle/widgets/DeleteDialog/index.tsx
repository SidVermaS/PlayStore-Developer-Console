import {useState, forwardRef, ForwardRefRenderFunction, useImperativeHandle} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './index.module.scss'

interface DeleteDialogProps {
    toggle: Function
}

interface DeleteDialogRefs {
    deleteProject: Function
}

const DeleteDialog:ForwardRefRenderFunction<DeleteDialogProps,DeleteDialogRefs> = ({deleteProject} ,ref) => {
    useImperativeHandle(ref, ()=>   ({
        toggle:()=> {
            setOpen(prev=>!prev)
        }
    }))
    const [open, setOpen]=useState<boolean>(false)
    const handleClose=()=>  {
        setOpen(false)
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Once the project is deleted then it can't be reverted
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
            <Button onClick={()=>{
                handleClose()
                deleteProject()
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

export default forwardRef(DeleteDialog)
