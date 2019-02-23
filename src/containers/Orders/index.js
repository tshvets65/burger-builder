import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as orderActions from '../../store/actions/order'
import Spinner from '../../components/UI/Spinner'

class Orders extends Component {

    componentDidMount() {
        const { token, userId } = this.props
        this.props.onFetchOrders(token, userId)
    }

    render() {
        const { loading, orders } = this.props

        if (loading) {
            return <Spinner />
        }

        if (!orders) {
            return <p>No orders found</p>
        }

        return (
            <div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients} price={+order.price} />
                ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(orderActions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))