import React from 'react'
import classes from './Button.module.css'

const Button = ({ children, clicked, btnType, disabled }) => (
    <button onClick={clicked} className={`${classes.button} ${classes[btnType]}`} disabled={disabled}>{children}</button>
)
export default Button