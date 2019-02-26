import React, { memo } from 'react'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop'

const Modal = ({ children, show, modalClosed }) => (
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

export default memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
)