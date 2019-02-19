import React, { Component } from 'react'
import Button from '../../../components/UI/Button'
import Spinner from '../../../components/UI/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        loading: false
    }

    orderHandler = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'John Doe',
                address: '123 Willow St',
                city: 'River Town',
                state: 'CA',
                zipcode: '12345',
                email: 'johndoe@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false }, () => this.props.history.push('/'))
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        const { loading } = this.state
        if (loading) {
            return <Spinner />
        }
        return (
            <div className={classes.contactdata}>
                <h4>Enter Your Contact Data</h4>
                <form >
                    <input className={classes.input} type="text" name='name' placeholder='Your name' />
                    <input className={classes.input} type="email" name='email' placeholder='Your email' />
                    <input className={classes.input} type="text" name='address' placeholder='Address' />
                    <input className={classes.input} type="text" name='city' placeholder='City' />
                    <input className={classes.input} type="text" name='state' placeholder='State' />
                    <input className={classes.input} type="text" name='zipcode' placeholder='Zipcode' />
                    <Button btnType='success' clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData