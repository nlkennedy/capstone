import React from 'react';

import logo from '../images/logo.png';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-custom">
                <a className="navbar-brand navbar-text" href="/">
                    <img id="logo" src={logo} width="50" height="30" className="d-inline-block align-top" alt="" />
                    IntelliSquash
                </a>
            </nav>
        )
    }
}

export default Navbar;