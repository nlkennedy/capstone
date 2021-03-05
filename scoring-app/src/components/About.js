import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container" style={{ marginTop: '5%' }}>
                        <h1> About </h1>
                        <div style={{ marginTop: '2%', marginRight: '20%', marginLeft: '20%' }}>                        
                            <p>
                                This app is a squash game scoring app originally built for the Tufts Squash team. 
                                This application scores and tracks all games, and our main feature is a machine 
                                learning model that uses live video to read referee hand signals to aid in scoring the games.
                            </p>
                            <p>
                                This app was built by Ben Bodine, Harsh Prajapati, Nicole Kennedy, and Radhika Joshi for Tufts Senior Capstone 2020 - 2021. 
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                        <a className="nav-link" href="/">Back to Home</a>
                </footer>
            </div>
        )
    }
}

export default About;