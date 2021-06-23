import {useEffect,useState} from 'react'
import {connect} from 'react-redux'
import cookies from 'react-cookies'
import SnackBar from '@material-ui/core/Snackbar'
import styles from './App.module.scss'
import PageRoutes from './PageRoutes'
import {save,remove} from './store/actions'
import {SUCCESS_MESSAGE,} from './store/constants'

const App=(props:any)=>  {
  
  const [open, setOpen] = useState<boolean>(false);
  useEffect(()=>  {
    if(localStorage.getItem('user') && cookies.load('token')) {
      props.save(JSON.parse(localStorage.getItem('user')!))
    } else    {
      props.remove(()=>{})
    }
    // eslint-disable-next-line
  },[localStorage.getItem('user'), cookies.load('token')])
  useEffect(()=>{
    if(props.message.message) {
      setOpen(true)
    }
  },[props.message])
  return (
    <>
      <SnackBar
      onClose={()=>setOpen(false)}
      open={open}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={4000}
        message={props.message?.message}
        key='snackbar'
        className={props.message?.type===SUCCESS_MESSAGE?styles.snackBarSucess:styles.snackBarError}
      />
      <PageRoutes />
    </>
  );
}

const mapStateToProps=({user, message}:any)=>({
  user: user.user,
  message: message,
})
export default connect(mapStateToProps, {save,remove})(App);
