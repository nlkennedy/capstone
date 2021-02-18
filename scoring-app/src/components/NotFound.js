import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div style={{ marginTop: '10%' }}>
                <h1>404 Not Found</h1>
                <a class="nav-link" href="/about">Back to Home</a>
            </div>
        )
    }
}

export default NotFound;