import React, { Component } from 'react'
import Modal from '../../components/UI/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                error: null
            }

            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({ error })
            })
        }




        errorConfirmedHandler = () => this.setState({ error: null })

        render() {
            const { error } = this.state
            return (
                <>
                    <Modal show={error} modalClosed={this.errorConfirmedHandler}>
                        {error ? error.message || 'Something went wrong!' : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </>
            )
        }
    }
}

export default withErrorHandler