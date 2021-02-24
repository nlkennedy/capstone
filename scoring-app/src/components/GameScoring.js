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
            points: [], // entries are [home_point_selection, away_point_selection]
            selection: {
                team: "home", // or "away"
                side: "R" // or "L"
            }
        };
    
        this.handleScorePlusOne = this.handleScorePlusOne.bind(this);
        this.handleBeginNextGame = this.handleBeginNextGame.bind(this);
        this.handleServeChange = this.handleServeChange.bind(this);
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

    // returns the opposite selection
    not(selection) {
        if (selection === "R") {
            return "L";
        } else if (selection === "L") {
            return "R";
        } else if (selection === "home") {
            return "away";
        } else if (selection === "away") {
            return "home";
        }
    }

    updateSelection(team) {
        var selection = this.state.selection;
        if (selection.team === team) {
            selection.side = this.not(selection.side);
        } else {
            selection.side = 'R'; // default to right side
            selection.team = this.not(selection.team);
        }
        const id = selection.team + "-" + selection.side;
        this.updateServeButtons(id);
        this.setState({ selection: selection })
    }

    gameOver(game) {
        const win_by_two = Math.abs(game.home_player_score - game.away_player_score) >= 2;
        return ((game.home_player_score >= 11) || (game.away_player_score >= 11)) && (win_by_two);
    }

    handleScorePlusOne(team_score, e) {
        e.preventDefault();

        // update state
        var game = this.state.game;
        if (!game.done && !this.gameOver(game)) {
            game[team_score] += 1;

            // log serve & point
            const point = game[team_score] + this.state.selection.side;
            var points = this.state.points;
            var team = team_score.split('_')[0];
            if (team === "home") {
                points.push([point, ""])
            } else {
                points.push(["", point])
            }
            this.setState({ points: points });

            // change selection if necessary
            this.updateSelection(team);

            // check if game over and update done fields as necessary
            if (this.gameOver(game)) {
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

    updateServeButtons(id) {
        var buttons = document.getElementsByClassName("serve-change");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('shaded-blue');
        }
        document.getElementById(id).classList.add('shaded-blue');
    }

    handleServeChange(e) {
        const id = e.target.id.split("-");
        var selection = this.state.selection;
        selection.team = id[0];
        selection.side = id[1];
        this.setState({ selection: selection });
        this.updateServeButtons(e.target.id)
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
                                            <h3 id="home-L" className="serve-change game-button" type="button" onClick={this.handleServeChange}>L</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12"> 
                                            <h3 id="home-R" className="serve-change game-button shaded-blue" type="button" onClick={this.handleServeChange}>R</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="container">
                                        {/* <h5> */}
                                            { this.state.points.map((point, i) => 
                                                <div key={"point-" + i} className="row">
                                                    <div className="col-6 text-right">{point[0]}</div>
                                                    <div className="col-6 text-left">{point[1]}</div>
                                                </div>
                                            )}
                                        {/* </h5> */}
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
                                            <h3 id="away-L" className="serve-change game-button" type="button" onClick={this.handleServeChange}>L</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3 id="away-R" className="serve-change game-button" type="button" onClick={this.handleServeChange}>R</h3>
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