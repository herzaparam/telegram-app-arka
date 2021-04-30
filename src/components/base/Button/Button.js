import React from 'react'
import styles from './Button.module.css'

function Button({ title, className, onClick }) {
    return (
        <button className={styles[className]} onClick={onClick}>{title}</button>
    )
}

export default Button
