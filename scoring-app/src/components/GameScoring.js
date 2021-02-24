import React from 'react';
// import profile from '../images/person.jpg';
import plus from '../images/plus.png';
import axios from 'axios';

class GameScoring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {},
            match_done: false,
        };
    
        this.handleScorePlusOne = this.handleScorePlusOne.bind(this);
        this.handleBeginNextGame = this.handleBeginNextGame.bind(this);
    }

    componentDidMount() {
        const game_id = window.location.pathname.split('/')[2];
        axios.get(`http://localhost:8000/api/games`, {
            params: {
                game_id: game_id
            }
        })
        .then(res => {
            const data = res.data;
            this.setState({
                game: data.game_data, 
                match: data.match_data
            });
        });
    }

    game_over(game) {
        const win_by_two = Math.abs(game.home_player_score - game.away_player_score) >= 2;
        return ((game.home_player_score >= 11) || (game.away_player_score >= 11)) && (win_by_two);
    }

    handleScorePlusOne(team, e) {
        e.preventDefault();

        // update state
        var game = this.state.game;
        if (!game.done && !this.game_over(game)) {
            game[team] += 1;
            if (this.game_over(game)) {
                game.done = true; 

                // update match in database 
                var match = this.state.match;
                const game_winner = game.home_player_score > game.away_player_score ? 'home_player_score' : 'away_player_score';
                match[game_winner] += 1;
                const match_winner = (match.home_player_score >= 3) || (match.away_player_score >= 3);
                if (match_winner) {
                    match.done = true;
                }
                this.setState({ 
                    match: match,
                    match_done: true,
                });

                axios.patch(`http://localhost:8000/api/matches`, match)
                    .then((res) => {
                    }, (error) => {
                        console.log(error);
                    });
            }
        }

        this.setState({ game: game });

        // update game in database 
        axios.patch(`http://localhost:8000/api/games`, this.state.game)
        .then((res) => {
        }, (error) => {
            console.log(error);
        });
    }

    handleBeginNextGame(match_id, game_number, e) {
        e.preventDefault();
        const data = {
            'match_id': match_id,
            'game_number': game_number
        }

        axios.post(`http://localhost:8000/api/games`, data)
            .then((res) => {
                const game_id = res.data.game_id
                window.location.href = '/game/' + game_id + '/scoring';
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container">
                        <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoring</h1>

                        <div className="container" style={{ paddingRight: '10%', paddingLeft: '10%' }}>
                            <div className="row">
                                <div className="col-4">
                                    <h4 className="shaded-gray">{this.state.match.home_team_name}</h4>
                                </div>
                                <div className="col-4 align-self-center">
                                    <h6>Game {this.state.game.game_number}</h6>
                                </div>
                                <div className="col-4">
                                    <h4 className="shaded-gray">{this.state.match.away_team_name}</h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="shaded-gray">
                                        <span>{this.state.match.home_player_name}</span>
                                    </h5>
                                </div>
                                <div className="col-4 align-self-center">
                                    <h1>{this.state.game.home_player_score} | {this.state.game.away_player_score}</h1>
                                </div>
                                <div className="col-4">
                                    <h5 className="shaded-gray">
                                        <span>{this.state.match.away_player_name}</span>
                                    </h5>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-4">
                                    <img src={profile} className="img-fluid w-75" alt="" />
                                </div>
                                <div className="col-4 align-self-center">
                                    <h1>4 | 5</h1>
                                </div>
                                <div className="col-4">
                                    <img src={profile}  className="img-fluid w-75" alt="" />
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <button className="shaded-gray" onClick={(e) => this.handleScorePlusOne("home_player_score", e)}>
                                                <img src={plus} className="img-fluid w-75" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="game-button">L</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="game-button">R</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 align-self-center">
                                    <div className="container">
                                        <h5>
                                            <div className="row">
                                                <div className="col-6 text-right"></div>
                                                <div className="col-6 text-left">1L</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 text-right">1R</div>
                                                <div className="col-6 text-left"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 text-right">2L</div>
                                                <div className="col-6 text-left"></div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 text-right"></div>
                                                <div className="col-6 text-left">2R</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 text-right"></div>
                                                <div className="col-6 text-left">3L</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6 text-right"></div>
                                                <div className="col-6 text-left">4R</div>
                                            </div>
                                        </h5>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <button className="shaded-gray" onClick={(e) => this.handleScorePlusOne("away_player_score", e)}>
                                                <img src={plus} className="img-fluid w-75" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="game-button">L</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 className="shaded-blue game-button">R</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="shaded-orange">Referee Call</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className="shaded-red game-button">Undo</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className="shaded-orange">Referee Call</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    { this.state.game.done && !this.state.match.done && 
                                        <button type="button" className="btn btn-secondary btn-block btn-lg" onClick={(e) => this.handleBeginNextGame(this.state.match.match_id, this.state.game.game_number + 1, e)}>START GAME #{this.state.game.game_number + 1}</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <a className="nav-link" href={"/matchup/" + this.state.match.team_match_id}>Back to Team Matchup</a>
                </footer>
            </div>
        )
    }
}

export default GameScoring;