import {  
  useState,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  } from 'react';
import {useHistory} from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './index.module.scss'
import {drawerItems} from './siderDrawerItems'

interface SideDrawerForwardProps  {
  toggle: Function
}
interface SideDrawerForwardRefs  {
  toggleDrawer: Function
  handleLogOut: Function
}
const SideDrawer:ForwardRefRenderFunction<
SideDrawerForwardProps,
SideDrawerForwardRefs
>=({toggleDrawer,handleLogOut}, ref)=> {
  useImperativeHandle(ref, ()=>  ({
    toggle: ()=> {
      setOpen(prev=>!prev)
      console.log('~~~ open: ',open)
    }
  }))
  const [open, setOpen] = useState<boolean>(false);
  const history=useHistory()


  const handleDrawerClose = () => {
    setOpen(false);
    toggleDrawer()
  };

  return (
    <div className={`${styles.background} ${open?styles.openDrawer:styles.closeDrawer}`}>
      <Drawer
        variant="permanent"
      >
        <div className={`ml-auto mr-2 ${styles.sideDrawerBackIcon}`}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className='ml-2 mt-3'>
          {drawerItems.map((item, index)=>(
            <ListItem onClick={()=>{
              if(item.path) {
                history.push(item.path)
              } else  {
                handleLogOut()
              }
            }} button key={index} className={styles.sideDrawerIcon}>
              <ListItemIcon>{<item.icon />}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default forwardRef(SideDrawer)