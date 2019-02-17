import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]

const BuildControls = ({ ingredientAdded, ingredientRemoved, disabledInfo, price }) => (
    <div className={classes.buildcontrols}>
        <p>Current Price: <strong>${price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.type}
                label={ctrl.label}
                added={() => ingredientAdded(ctrl.type)}
                removed={() => ingredientRemoved(ctrl.type)}
                disabled={disabledInfo[ctrl.type]}
            />
        ))}
    </div>
)

export default BuildControls