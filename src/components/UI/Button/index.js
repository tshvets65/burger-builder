import React from 'react'
import classes from './Button.module.css'

const Button = ({ children, clicked, btnType }) => (
    <button onClick={clicked} className={[classes.button, classes[btnType]].join(' ')}>{children}</button>
)
export default Button