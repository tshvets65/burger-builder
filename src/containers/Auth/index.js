import React, { Component } from 'react'

class Auth extends Component {
    state = {
        controls: {
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
        }
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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = isValid && pattern.test(value)
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = isValid && pattern.test(value)
        }
        return isValid
    }

    render() {
        return (
            <div>
                <form>

                </form>
            </div>
        )
    }
}

export default Auth