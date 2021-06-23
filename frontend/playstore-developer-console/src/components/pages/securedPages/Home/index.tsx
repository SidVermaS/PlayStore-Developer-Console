import React from 'react'
import ProjectsTable from './widgets/ProjectsTable'

import styles from './index.module.scss'
const Home = () => {

    return (
        <div className={styles.background}>
            <div className={styles.heading}>
                <p className={styles.title}>ALL APPLICATIONS</p>
            </div>
            <ProjectsTable  />
        </div>
    )
}

export default Home
