import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    state = {
        team_matches: []
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/teammatches-summary`)
        .then(res => {
            const team_matches = res.data.reverse();
            this.setState({ team_matches });
        })
    }

    render() {
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container clear-top" style={{ marginTop: '5%' }} >
                        <div className="justify-content-center">
                            <a className="btn-custom btn btn-secondary btn-lg" href="/create-matchup" role="button">New Team Matchup</a>
                        </div>

                        <div>
                            <h4 style={{ marginTop: '5%' }}>Incomplete Team Matchups</h4>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="w-40" scope="col">Home Team</th>
                                        <th className="w-40" scope="col">Away Team</th>
                                        <th className="w-20" scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.team_matches.map((team_match, i) => 
                                        !team_match.done &&
                                        <tr key={"teammatch-" + team_match.pk} className="hover" onClick={() => window.location="/matchup/" + team_match.pk}>
                                            <td>{team_match.home_team_name}</td>
                                            <td>{team_match.away_team_name}</td>
                                            <td>{team_match.date_played}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h4 style={{ marginTop: '5%' }}>Completed Team Matchups</h4>
                            <table className="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="w-40" scope="col">Home Team</th>
                                        <th className="w-40" scope="col">Away Team</th>
                                        <th className="w-20" scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.team_matches.map((team_match, i) => 
                                        team_match.done &&
                                        <tr key={"teammatch-" + team_match.pk} className="hover" onClick={() => window.location="/matchup/" + team_match.pk}>
                                            <td>{team_match.home_team_name}</td>
                                            <td>{team_match.away_team_name}</td>
                                            <td>{team_match.date_played}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>

                <footer className="footer">
                    <a className="nav-link" href="/about">About</a>
                </footer>
            </div>
        )
    }
}

export default Home;