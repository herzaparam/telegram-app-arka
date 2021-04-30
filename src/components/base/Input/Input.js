import React from 'react'
import styles from './Input.module.css'

function Input({ className, type, title, placeholder, value }) {
    return (
        <div className={styles[`${className}`]}>
            <label htmlFor="">{title}</label>
            <input type={type} placeholder={placeholder} value={value} />
        </div>
    )
}

export default Input
