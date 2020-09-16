import React, { Component } from 'react';
import axios from '../../axios';
import Input from '../../component/UI/Input/Input';
import TextContainer from '../../component/UI/TextContainer/TextContainer';
import Button from '../../component/UI/Button/Button';
import Logo from '../../component/UI/Logo/Logo'
import classes from './Auth.module.css';

class Auth extends Component {
    state = {
        authForm: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: true,
                errorMessage: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: true,
                errorMessage: ''
            }
        },
        isLoggingIn: true
    }

    checkValidity = (key, formElement) => {
        formElement.errorMessage = '';
        formElement.isValid = true;

        if (formElement.validation.required && formElement.value.trim() === "") {
            formElement.errorMessage = `Must provide a ${key}.`;
            formElement.isValid = false;
        }
    }

    formIsValid = () => {
        let formIsValid = true;

        const authForm = {
            ...this.state.authForm,
        };

        for (let key in authForm) {
            const formElement = {
                ...authForm[key]
            }

            this.checkValidity(key, formElement);
            formIsValid &= formElement.isValid;
            authForm[key] = formElement;
        }

        this.setState({authForm});

        return formIsValid;
    }

    onChangeAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLoggingIn: !prevState.isLoggingIn}
        })
    }

    onChangeHandler = (event, key) => {
        const authForm = {
            ...this.state.authForm,
        };

        const formElement = {
            ...authForm[key]
        };

        formElement.value = event.target.value;
        this.checkValidity(key, formElement);

        authForm[key] = formElement;
        this.setState({authForm});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const authForm = {};

        for (let element in this.state.authForm) {
            authForm[element] = this.state.authForm[element].value;
        }

        if(this.formIsValid()) {
            const requestBody = {
                username: this.state.authForm.username.value,
                password: this.state.authForm.password.value
            }

            const url = this.state.isLoggingIn ? '/login' : '/signin';

            axios.post(url, requestBody)
            .then (response => {
                this.props.history.push('/board');
            })
            .catch (error => {
                const response = error.response;
                if (response && response.status === 400) {
                    const key = response.data[0].field;
                    const errorMessage = response.data[0].error;

                    const authForm = {
                        ...this.state.authForm
                    };
                    const errorElement = {
                        ...authForm[key]
                    }

                    errorElement.isValid = false;
                    errorElement.errorMessage = errorMessage;

                    authForm[key] = errorElement;
                    this.setState({authForm});
                } else {
                    alert('Could not connect to database....')
                }
            })
        }
    }

    render () {
        const authFormArray = [];

        for (let key in this.state.authForm) {
            authFormArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }

        const formJSX = authFormArray.map( formElement => (
            <Input key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                valid={formElement.config.isValid}
                errorMessage={formElement.config.errorMessage}
                onChange={(event) => this.onChangeHandler(event, formElement.id)}/>
        ))
    
        const authDisplay = (
            <form onSubmit={this.onSubmitHandler}>
                {formJSX}
                <Button>{this.state.isLoggingIn ? "Log In" : "Sign In"}</Button>
            </form>
        )

        return (
            <div className={classes.Auth}>
                <TextContainer>
                    <Logo style={{fontSize:'2em', marginBottom:'1.5em'}}></Logo>
                    {authDisplay}

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

export default Auth