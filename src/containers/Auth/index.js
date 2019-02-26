import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Spinner from '../../components/UI/Spinner'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/auth'
import { checkValidity } from '../../shared/utility'


const Auth = ({ buildingBurger, authRedirectPath, onSetAuthRedirectPath, onAuth, loading, error, isAuth }) => {

    const [controls, setControls] = useState({
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
    })

    const [formIsValid, setFormIsValid] = useState(false)
    const [isSignup, setIsSignUp] = useState(true)

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath()
        }
    }, [])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            }
        }

        let formValid = true
        for (let key in updatedControls) {
            formValid = formValid && updatedControls[key].valid
        }
        setControls(updatedControls)
        setFormIsValid(formValid)
    }

    const submitHandler = event => {
        event.preventDefault()
        onAuth(controls.email.value, controls.password.value, isSignup)
    }

    const switchAuthModeHandler = () => setIsSignUp(!isSignup)

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
            <form onSubmit={submitHandler}>
                {Object.keys(controls).map(key => (
                    <Input
                        key={key}
                        id={key}
                        elementType={controls[key].elementType}
                        elementConfig={{ ...controls[key].elementConfig, name: key }}
                        value={controls[key].value}
                        invalid={!controls[key].valid}
                        touched={controls[key].touched}
                        changed={event => inputChangedHandler(event, key)}
                    />
                ))
                }
                <Button btnType='success' disabled={!formIsValid} clicked={submitHandler}>SUBMIT</Button>
            </form>
            <Button btnType='danger' clicked={switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
        </div>
    )

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