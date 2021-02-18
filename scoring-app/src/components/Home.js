import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    state = {
        team_matches: []
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/teammatches-summary`)
        .then(res => {
            const team_matches = res.data;
            this.setState({ team_matches });
        })
    }

    render() {
        return (
            <div>
                <div id="wrap">
                    <div id="main" class="container clear-top" style={{ marginTop: '5%' }} >
                        <div class="justify-content-center">
                            <a class="btn-custom btn btn-secondary btn-lg" href="/create-matchup" role="button">New Team Matchup</a>
                        </div>

                        <div>
                            <h4 style={{ marginTop: '5%' }}>Incomplete Team Matchups</h4>
                            <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                { this.state.team_matches.map(team_match => 
                                    !team_match.done &&
                                    <div >
                                        <a class="btn-custom btn btn-secondary btn-lg mr-2" href={"/matchup/" + team_match.pk} role="button">
                                            {team_match.home_team_name} vs. {team_match.away_team_name} <br /> {team_match.date_played}
                                            {team_match.done &&  
                                                <span>done</span>
                                            }
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <h4 style={{ marginTop: '5%' }}>Completed Team Matchups</h4>
                            <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
                                { this.state.team_matches.map(team_match => 
                                    team_match.done &&
                                    <div >
                                        <a class="btn-custom btn btn-secondary btn-lg mr-2" href={"/matchup/" + team_match.pk} role="button">
                                            {team_match.home_team_name} vs. {team_match.away_team_name} <br /> {team_match.date_played}                                        
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                    </div>
                </div>

                <footer class="footer">
                    <a class="nav-link" href="/about">About</a>
                </footer>
            </div>
        )
    }
}

export default Home;