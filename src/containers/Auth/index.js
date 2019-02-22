import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Spinner from '../../components/UI/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/auth'

class Auth extends Component {
    state = {
        controls: {

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: true
    }

    componentDidMount() {
        const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }

        let formIsValid = true
        for (let key in updatedControls) {
            formIsValid = formIsValid && updatedControls[key].valid
        }
        this.setState({ controls: updatedControls, formIsValid })
    }

    submitHandler = event => {
        event.preventDefault()
        const { controls, isSignup } = this.state
        this.props.onAuth(controls.email.value, controls.password.value, isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        const { controls, formIsValid, isSignup } = this.state
        const { loading, error, isAuth, authRedirectPath } = this.props

        if (loading) {
            return <Spinner />
        }

        if (isAuth) {
            return <Redirect to={authRedirectPath} />
        }

        return (
            <div className={classes.auth}>
                <h2>{isSignup ? 'SIGN UP' : 'SIGN IN'}</h2>
                {error && <p className={classes.error}>{error.message || 'Something went wrong :('}</p>}
                <form onSubmit={this.submitHandler}>
                    {Object.keys(controls).map(key => (
                        <Input
                            key={key}
                            id={key}
                            elementType={controls[key].elementType}
                            elementConfig={{ ...controls[key].elementConfig, name: key }}
                            value={controls[key].value}
                            invalid={!controls[key].valid}
                            touched={controls[key].touched}
                            changed={event => this.inputChangedHandler(event, key)}
                        />
                    ))
                    }
                    <Button btnType='success' disabled={!formIsValid} clicked={this.submitHandler}>SUBMIT</Button>
                </form>
                <Button btnType='danger' clicked={this.switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)