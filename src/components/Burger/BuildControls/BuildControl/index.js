import React from 'react'
import classes from './BuildControl.module.css'

const BuildControl = ({ label, added, removed, disabled }) => (
    <div className={classes.buildcontrol}>
        <div className={classes.label}>{label}</div>
        <button className={classes.less} onClick={removed} disabled={disabled}>Less</button>
        <button className={classes.more} onClick={added}>More</button>
    </div>
)

export default BuildControl