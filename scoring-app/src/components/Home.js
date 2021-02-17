import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {
    state = {
        team_matches: []
      }
    
      componentDidMount() {
        axios.get(`http://localhost:8000/api/teammatches`)
          .then(res => {
            const team_matches = res.data;
            this.setState({ team_matches });
          })
      }
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


                <ul>
                    { this.state.team_matches.map(team_match => <li key={team_match.team_match_id}>{team_match.home_team_id}</li>)}
                </ul>
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