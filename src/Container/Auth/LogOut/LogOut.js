import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../../utils';

class Logout extends Component {
    componentDidMount () {
        logOut()
    }
    render () {
        return <Redirect to="/"/>;
    }
}

export default Logout;