import React from 'react'

import styles from './CardFriend.module.css'
import {profileTest} from '../../../assets/image'

function CardFriend() {
    return (
        <div className={styles["group"]}>
            <div className={styles["group-1"]}>
            <img src={profileTest} alt=""/>
            </div>
            <div className={styles["group-2"]}>
                <h4>Theressa web</h4>
                <p>this is chat</p>
            </div>
            <div className={styles["group-3"]}>
                <h5>15.02</h5>
                <div className={styles["group-3-p"]}><p>2</p></div>
            </div>
        </div>
    )
}

export default CardFriend
