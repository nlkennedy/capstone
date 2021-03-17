import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <h1>404 Not Found</h1>
                <a className="nav-link" href="/">
                    Back to Home
                </a>
            </div>
        );
    }
}

export default NotFound;
