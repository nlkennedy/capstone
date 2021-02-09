import React from 'react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div class="container" style={{ marginTop: '5%' }} >
                    <div class="row justify-content-center" >
                        <a class="btn-custom btn btn-secondary btn-lg" href="/create-matchup" role="button">New Team Matchup</a>
                    </div>
                    <div class="row justify-content-center">
                        <a class="btn-custom btn btn-secondary btn-lg" href="/matchup/:team_matchup_id" role="button">Existing Team Matchup</a>
                    </div>
                </div>

                <footer class="footer">
                    <div class="container h-100 d-flex justify-content-center align-items-center">
                        <a class="nav-link" href="/about">About</a>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Home;