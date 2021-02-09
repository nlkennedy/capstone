import React from 'react';
import {Link} from 'react-router';

import logo from '../images/logo.png';

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-custom">
                <a class="navbar-brand navbar-text" href="/">
                    <img id="logo" src={logo} width="50" height="30" class="d-inline-block align-top" alt="" />
                    Cool App Name
                </a>
            </nav>
        )
    }
}

export default Navbar;