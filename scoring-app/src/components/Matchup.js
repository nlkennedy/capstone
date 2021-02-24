import React from 'react';
import axios from 'axios';

class Matchup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            matches: []
        };
    
        this.handleBeginGame = this.handleBeginGame.bind(this);
        this.handleContinueGame = this.handleContinueGame.bind(this);
    }

    async componentDidMount() {
        var game_data = []
        var $this = this

        // Get matches summary which contains all match ids
        const [matches_summary] = await Promise.all([
            axios.get(`http://localhost:8000/api/matches-summary`, {
                params: {
                    team_match_id: window.location.pathname.split('/')[2]
                }
            })
        ]);
      
        // Make request for every match to get the game summary
        axios.all(matches_summary.data.matches.map(match => axios.get(`http://localhost:8000/api/games-summary`, {
            params: {
                match_id: match.pk
            }
        })))
        .then(axios.spread(function (...responses) {
            // Add game summary to each match 
            game_data = responses.map(response => response.data);
            var matches = matches_summary.data.matches.map(function(match, i) {
                // sort games by game number
                match["games"] = game_data[i].sort((a, b) => (a.game_number > b.game_number) ? 1 : -1)
                return match;
            })

            $this.setState({
                info: matches_summary.data, 
                matches: matches
            });
        }));
    }

    // Link to a game that doesn't exist
    handleBeginGame(match_id, game_number, e) {
        e.preventDefault();
        const data = {
            'match_id': match_id,
            'game_number': game_number
        }

        axios.post(`http://localhost:8000/api/games`, data)
            .then((res) => {
                const game_id = res.data.game_id
                window.location.href = '/game/' + game_id + '/scoring'
            }, (error) => {
                console.log(error);
            });
    }

    // Link to a game that already exists
    handleContinueGame(game_id, e) {
        e.preventDefault();
        window.location.href = '/game/' + game_id + '/scoring';
    }

    render() {
        const match_length = 5;
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container">
                        <h1 style={{ marginTop: '5%' }} >Matchup</h1>
                        <h2 style={{ marginBottom: '5%' }}>{ this.state.info.home_team_name } vs { this.state.info.away_team_name } </h2>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="w-5 matchup-header" scope="col">#</th>
                                    <th className="w-25 team1-winner" scope="col">{ this.state.info.home_team_name }</th>
                                    <th className="w-40 matchup-header" scope="col">Game</th>
                                    <th className="w-25 team2-winner" scope="col">{ this.state.info.away_team_name }</th>
                                    <th className="w-5 matchup-header" scope="col">Court</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.matches.map(match => 
                                    <tr key={"match-" + match.pk}>
                                        <th scope="row"> {match.match_rank} </th>
                                        <td className={match.done && (match.home_player_score > match.away_player_score) ? "team1-winner" : ""}> {match.home_player_name} </td>
                                        <td>
                                            { match.games.length > 0 && 
                                                <table className="table table-sm table-bordered table-game-sum table-fixed">
                                                    <tbody>
                                                        <tr>
                                                            { match.games.map(game => 
                                                                <td key={"game-" + game.pk} className={game.done && (game.home_player_score > game.away_player_score) ? "team1-winner" : ""} width="20%">{game.home_player_score}</td>
                                                            )}
                                                            { match.games.length < 5 && 
                                                                [...Array(match_length - match.games.length)].map((e, i) => <td key={"game-filler-home-" + match.pk + "-" + i} width="20%"></td>)
                                                            }
                                                        </tr>
                                                        <tr>
                                                            { match.games.map(game => 
                                                                <td key={"game-" + game.pk} className={game.done && (game.home_player_score < game.away_player_score) ? "team2-winner" : ""} width="20%">{game.away_player_score}</td>
                                                            )}
                                                            { match.games.length < 5 && 
                                                                [...Array(match_length - match.games.length)].map((e, i) => <td key={"game-filler-away-" + match.pk + "-" + i} width="20%"></td>) 
                                                            }
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            }
                                            { !match.done && (match.games.length === 0 || match.games[match.games.length - 1].done) && 
                                                <button type="button" className="btn btn-outline-secondary m-2" onClick={(e) => this.handleBeginGame(match.pk, match.games.length === 0 ? 1 : match.games.length + 1, e)}>BEGIN MATCH</button>
                                            }
                                            { !match.done && match.games.length > 0 && !match.games[match.games.length - 1].done && 
                                                <button type="button" className="btn btn-outline-secondary m-2" onClick={(e) => this.handleContinueGame(match.games[match.games.length - 1].pk, e)}>CONTINUE MATCH</button>
                                            }
                                        </td>
                                        <td className={match.done && (match.home_player_score < match.away_player_score) ? "team2-winner" : ""}> {match.away_player_name} </td>
                                        <td> {match.court_number} </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <footer className="footer">
                        <a className="nav-link" href="/">Back to Home</a>
                </footer>
            </div>
        )
    }
}

export default Matchup;