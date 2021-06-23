
import {useState} from 'react'
import styles from './index.module.scss'
import Login from './widgets/Login'
import Register from './widgets/Register'
const Welcome = () => {

    const [showLogin,setShowLogin]=useState<boolean>(true)

    const toggleRightPanel=()=> {
        setShowLogin(prev=>!prev)
    }
    return (
        <div className={`${styles.background}`}>
            <div className={`${styles.cardBackground} row`}>
                <div className={`${styles.leftPanel} col-6 d-flex justify-content-center align-items-center`}>
                    <div>
                        <h3 className={styles.leftPanelHeading}>Welcome to App store Clone</h3>
                        <p className={`${styles.leftPanelDescription} mt-4`}>This Web Application is a clone of App store Console for the developers. We can upload the apk files and maintain multiple versions of the application. We can search for the apps from their titles and url.</p>
                    </div>
                </div>
                <div className={`${styles.rightPanel} col-6`}>
                    <div className={`${styles.rightPanelContent} ${showLogin?styles.rightPanelVerticalLogin:styles.rightPanelVerticalRegister}`}>
                        {showLogin?<Login toggle={toggleRightPanel}  />:<Register toggle={toggleRightPanel} />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Welcome
