import {useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import cookie from 'react-cookies'
import NotFound from '../components/pages/NotFound'
import { securedRoutes, unsecuredRoutes, path, } from './routes'
import {save,} from '../store/actions/'
import { UserI } from '../utilities/interfaces'
import { HeadAppBar } from '../components/widgets'

import styles from './index.module.scss'

const PageRoutes = (props:any) => {
    let [user,setUser]=useState<UserI>();
    useEffect(() => {// eslint-disable-next-line
        user=props.user
        setUser(user)
   
        // eslint-disable-next-line
    }, [props.user])
    return (
        <div className={`${user?styles.background:''}`}>
            {user && <HeadAppBar />}
            <Switch>
                {user?securedRoutes.map((route,)=><Route key={route.path} exact path={route.path} component={route.component}   />):unsecuredRoutes.map((route,)=><Route key={route.path} exact path={route.path} component={route.component} />)}
                {(!localStorage.getItem('user') || !cookie.load('token')) && <Redirect to={path.Login} />}
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}

const mapStateToProps=({user}:any)=> ({
    user: user.user
})

export default connect(mapStateToProps,{save})(PageRoutes)
