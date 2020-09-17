import React, { Component } from 'react';
import axios from '../../axios';
import Input from '../../component/UI/Form/Input/Input';
import TextContainer from '../../component/UI/TextContainer/TextContainer';
import Button from '../../component/UI/Form/Button/Button';
import Logo from '../../component/UI/Logo/Logo'
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        authForm: {
            username: {
                value: '',
                errorMessage: ''
            },
            password: {
                value: '',
                errorMessage: ''
            },
        },
        isLoggingIn: true
    }

    updateElement = (field, key, newValue) => {
        this.setState( (prevState) => {
            return({
                authForm: {
                    ...prevState.authForm,
                    [field]: {
                        ...prevState.authForm[field],
                        [key]: newValue
                    }
                }
            });
        })
    }

    formIsValid = () => {
        let formIsValid = true;

        const authForm = this.state.authForm;
        for (let key in authForm) {
            // If no value was provided, raise error
            if (!authForm[key].value.length) {
                this.updateElement(key, 'errorMessage', `Must provide a ${key}`)
                formIsValid = false;
            } else if (authForm[key].errorMessage){
                this.updateElement(key, 'errorMessage', '');
            }
        }

        return formIsValid;
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        if(this.formIsValid()) {
            const requestBody = {
                username: this.state.authForm.username.value,
                password: this.state.authForm.password.value
            }
            const url = this.state.isLoggingIn ? '/login' : '/signin';

            axios.post(url, requestBody)
            .then (response => {
                this.props.history.replace({
                    pathname: '/board',
                    state: {
                        userId: response.data.user._id,
                        token: response.data.token
                    }
                });
            })
            .catch (error => {
                const response = error.response;
                if (response && response.status === 400) {
                    const field = response.data[0].field;
                    const errorMessage = response.data[0].error;

                    this.updateElement(field, 'errorMessage', errorMessage);
                } else {
                    alert('Could not connect to database....')
                }
            })
        }
    }

    onChangeAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLoggingIn: !prevState.isLoggingIn}
        })
    }

    render () {
        return (
            <div className={classes.Auth}>
                <TextContainer>
                    <Logo style={{fontSize:'2em'}}></Logo>

                    <form onSubmit={this.onSubmitHandler}>
                        
                        <Input
                            value={this.state.authForm.username.value}
                            withError
                            invalid={this.state.authForm.username.errorMessage !== ''}
                            errorMessage={this.state.authForm.username.errorMessage}
                            placeholder='Username'
                            onChange={e => this.updateElement('username', 'value', e.target.value)}/>

                        <Input
                            type="password"
                            value={this.state.authForm.password.value}
                            withError
                            invalid={this.state.authForm.password.errorMessage !== ''}
                            errorMessage={this.state.authForm.password.errorMessage}
                            placeholder='Password'
                            onChange={e => this.updateElement('password', 'value', e.target.value)}/>

                        <Button>{this.state.isLoggingIn ? "Log In" : "Sign In"}</Button>
                    </form>

                    <div className={classes.authModeChanger}>
                        <p>
                            {this.state.isLoggingIn ? "No account yet? " : "Already have an account "}
                            <span onClick={this.onChangeAuthModeHandler}>
                                {this.state.isLoggingIn ? "Create one!" : "Log in!"}
                            </span>
                        </p>
                    </div>
                </TextContainer>
            </div>
        )
    }
}

export default Auth;