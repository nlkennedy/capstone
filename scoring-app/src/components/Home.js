import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <button type="button" class="btn btn-primary btn-lg">Existing Team Matchup</button>
                <button type="button" class="btn btn-primary btn-lg">New Team Matchup</button>
            </div>
        )
    }
}

export default Home;