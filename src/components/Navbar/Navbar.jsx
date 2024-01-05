import React from 'react'
import styles from "./styles.module.css"
import { useLocation, Link } from 'react-router-dom'

function Navbar() {
    const location = useLocation()
    const pathname = location.pathname
    
  return (
    <div className={styles.container}>
        <h3 className={styles.heading}>
          {pathname === "/" ? "Activity" : ""}
          {pathname === "/archived-call" ? "Archived" : ""}
        </h3>
        <div className={`${styles.container} ${styles["tabs-container"]}`}>
            <Link to={"/"} className={`
                ${styles.subheading}
                ${pathname === "/" ? styles.active : ""}
                `}>All Calls</Link>
            <Link to={"/archived-call"} className={`
                ${styles.subheading}
                ${pathname === "/archived-call" ? styles.active : ""}
                `}>Archived</Link>
        </div>
    </div>
  )
}

export default Navbar