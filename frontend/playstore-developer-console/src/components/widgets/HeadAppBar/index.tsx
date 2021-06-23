import {useEffect,useState,useRef} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {AppBar,Toolbar,IconButton,Typography, Menu, MenuItem,} from '@material-ui/core'
import {Menu as MenuIcon, AccountCircle as AccountCircleIcon,} from '@material-ui/icons'
import SearchAutocomplete from '../SearchAutocomplete'
import SideDrawer from '../SideDrawer'
import {remove} from '../../../store/actions/user'
import {path} from '../../../PageRoutes/routes'
import styles from './index.module.scss'

const HeadAppBar = (props: any) => {
    const [drawerOpen,setDrawerOpen]=useState<boolean>(false)
    const [menuOpen, setMenuOpen]=useState<boolean>(false)
    const [anchorEl, setAnchorEl]=useState<any>(null)
    const profileMenuBtnRef=useRef<any>(null)
    const sideDrawerRef=useRef<any>(null)
    const history=useHistory()

    useEffect(()=>  {
        setAnchorEl(profileMenuBtnRef.current)
    },[profileMenuBtnRef.current])
    const handleMenuClose=()=>  {
        setMenuOpen(false)
    }
    const toggleDrawer=()=>    {
        setDrawerOpen(prev=>!prev)
    }
    const navigate=()=> {
        history.replace(path.Login)
    }
    const handleLogOut=()=>{
        props.remove(navigate)
        handleMenuClose()
    }
    const renderMenu=()=>(
            anchorEl && <Menu className={styles.menu} anchorEl={anchorEl} open={menuOpen} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Log out</MenuItem>
            </Menu>
        )

    return (
        <div className={`${styles.background} ${drawerOpen?styles.openDrawer:styles.closeDrawer}`}>   
        
        <SideDrawer ref={sideDrawerRef} toggleDrawer={toggleDrawer} handleLogOut={handleLogOut} />         
            <AppBar position='fixed'>
                <Toolbar>
                    <IconButton onClick={()=>{
                        toggleDrawer()
                        sideDrawerRef.current?.toggle()}}>
                        <MenuIcon   />
                    </IconButton>
                    <Typography variant='h6' noWrap>App store Clone</Typography>
                    <SearchAutocomplete />
                    <IconButton ref={profileMenuBtnRef} className={styles.userIconButton} onClick={()=>setMenuOpen(true)} >
                        <AccountCircleIcon  />
                    </IconButton>
                </Toolbar>
            </AppBar>
           
            {renderMenu()}
        </div>
    )
}
const mapStateToProps=()=>  ({

})
export default connect(mapStateToProps, {remove})(HeadAppBar)
