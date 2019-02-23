import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button'
import Spinner from '../../../components/UI/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input'
import withErrorHandler from '../../../hoc/withErrorHandler'
import * as orderActions from '../../../store/actions/order'
import { checkValidity } from '../../../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: 'fastest',
                valid: true,
                touched: false
            }
        },
        formIsValid: false
    }

    orderHandler = event => {
        event.preventDefault()

        const { userId, token, ingredients, price } = this.props

        const orderData = {}
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value
        }

        const order = {
            ingredients,
            price,
            orderData,
            userId
        }
        this.props.onOrderBurger(order, token)
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedOrderForm[inputId] }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputId] = updatedFormElement
        let formIsValid = true
        for (let key in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[key].valid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid })
    }

    render() {
        const { orderForm, formIsValid } = this.state
        const { loading } = this.props

        if (loading) {
            return <Spinner />
        }

        return (
            <div className={classes.contactdata}>
                <h4>Enter Your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {Object.keys(orderForm).map(key => (
                        <Input
                            key={key}
                            id={key}
                            elementType={orderForm[key].elementType}
                            elementConfig={{ ...orderForm[key].elementConfig, name: key }}
                            value={orderForm[key].value}
                            invalid={!orderForm[key].valid}
                            touched={orderForm[key].touched}
                            changed={event => this.inputChangedHandler(event, key)}
                        />
                    ))
                    }
                    <Button btnType='success' disabled={!formIsValid}>ORDER</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))