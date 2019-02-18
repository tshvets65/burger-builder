import React, { Component } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
    }

    render() {
        const { children, show, modalClosed } = this.props
        return (
            <>
                <Backdrop show={show} clicked={modalClosed} />
                <div
                    className={classes.modal}
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-100vh',
                        opacity: show ? '1' : '0'
                    }}>
                    {children}
                </div>
            </>
        )
    }
}

export default Modal