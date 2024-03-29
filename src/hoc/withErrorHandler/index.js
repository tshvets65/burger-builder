import React from 'react'
import Modal from '../../components/UI/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios)

        return (
            <>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message || 'Something went wrong!' : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        )
    }
}

export default withErrorHandler