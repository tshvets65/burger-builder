import React from 'react'
import classes from './NavigationItem.module.css'

const NavigationItem = ({ children, link, active }) => (
    <li className={classes.navigationitem}>
        <a href={link} className={active ? classes.active : null}>{children}</a>
    </li>

)

export default NavigationItem