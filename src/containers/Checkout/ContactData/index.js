import React, { Component } from 'react'
import Button from '../../../components/UI/Button'
import Spinner from '../../../components/UI/Spinner'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input'


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
                    required: true
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
                    maxLength: 5
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
        formIsValid: false,
        loading: false
    }

    orderHandler = event => {
        event.preventDefault()
        this.setState({ loading: true })
        const orderData = {}
        for (let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false }, () => this.props.history.push('/'))
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    inputChangedHandler = (event, inputId) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormElement = { ...updatedOrderForm[inputId] }
        updatedFormElement.value = event.target.value
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true
        updatedOrderForm[inputId] = updatedFormElement
        let formIsValid = true
        for (let key in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[key].valid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid })
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = isValid && value.trim() !== ''
        }
        if (rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength
        }
        if (rules.maxLength) {
            isValid = isValid && value.trim().length <= rules.maxLength
        }
        return isValid
    }

    render() {
        const { loading, orderForm, formIsValid } = this.state
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
                            invalid={!orderForm[key].valie}
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

export default ContactData