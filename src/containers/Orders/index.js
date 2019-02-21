import React, { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler'
import * as orderActions from '../../store/actions/order'
import Spinner from '../../components/UI/Spinner'

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))