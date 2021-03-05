import React from 'react';
// import profile from '../images/person.jpg';
import plus from '../images/plus.png';
import axiosInstance from './axios';
import Webcam from "react-webcam";

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
            },
            webcamEnabled: false
        };

        this.handleScorePlusOne = this.handleScorePlusOne.bind(this);
        this.handleBeginNextGame = this.handleBeginNextGame.bind(this);
        this.handleServeChange = this.handleServeChange.bind(this);
        this.handleRefereeCall = this.handleRefereeCall.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
        this.getInitialPointsState = this.getInitialPointsState.bind(this);
        this.removePointsState = this.removePointsState.bind(this);
        this.updatePointsState = this.updatePointsState.bind(this);
        this.removeScoreboardState = this.removeScoreboardState.bind(this);
        this.updateScoreboardState = this.updateScoreboardState.bind(this);
        this.openWebcamModal = this.openWebcamModal.bind(this);
        this.closeWebcamModal = this.closeWebcamModal.bind(this);
    }

    componentDidMount() {
        const game_id = window.location.pathname.split('/')[2];
        axiosInstance.get(`api/games`, {
            params: {
                game_id: game_id
            }
        })
        .then(res => {
            const data = res.data;
            this.setState({
                game: data.game_data, 
                match: data.match_data,
                points: this.getInitialPointsState(game_id)
            });
            
            window.addEventListener('load', this.handleLoad);
            window.addEventListener("resize", this.updateDimensions);
            this.updateDimensions();
            this.updateScoreboardState(game_id);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
        window.removeEventListener("resize", this.updateDimensions);
        this.removeScoreboardState();
    }

    componentDidUpdate() {
        this.updateDimensions();
    }

    handleLoad() {
        this.updateDimensions();
    }

    updateDimensions() {
        document.getElementById("scrollable").style["height"] = 0 + "px";
        const target_height = document.getElementById("target").clientHeight;
        if (target_height < 400) {
            document.getElementById("scrollable").style["height"] = target_height + "px";
        }
    }

    // functions to deal with local storange for points
    getInitialPointsState(game_id) {
        return JSON.parse(localStorage.getItem('points-' + game_id)) || [];
    }

    removePointsState(game_id) {
        localStorage.removeItem('points-' + game_id);
    }

    updatePointsState(game_id, points) {
        this.setState({ points: points });
        localStorage.setItem('points-' + game_id, JSON.stringify(points));
    }

    // functions to deal with local storange for scoreboard state
    removeScoreboardState() {
        const game_id = this.state.game.game_id;
        localStorage.removeItem('game-' + game_id);
        localStorage.removeItem('match-' + game_id);
    }

    updateScoreboardState(game_id) {
        localStorage.setItem('game-' + game_id, JSON.stringify(this.state.game));
        localStorage.setItem('match-' + game_id, JSON.stringify(this.state.match));
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
            var team = team_score.split('_')[0];
            this.updateSelection(team);
            
            const point = game[team_score] + this.state.selection.side;
            var points = this.state.points;
            if (team === "home") {
                points.push([point, ""])
            } else {
                points.push(["", point])
            }
            this.updatePointsState(game.game_id, points)

            // check if game over and update done fields as necessary
            if (this.gameOver(game)) {
                game.done = true; 
                this.removePointsState(game.game_id);

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

                axiosInstance.patch(`api/matches`, match)
                    .then((res) => {
                    }, (error) => {
                        console.log(error);
                    });
            }
        }

        this.setState({ game: game });
        this.updateScoreboardState(game.game_id);

        // update game in database 
        axiosInstance.patch(`api/games`, this.state.game)
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

        axiosInstance.post(`api/games`, data)
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

    handleRefereeCall(team, e) {
        // TODO for Radhika & Harsh
        console.log("The " + team + " team requests a referee call");
        this.openWebcamModal();
        // window.open('http://localhost:8000/predict.html', null, 'height=1000,width=1200,status=yes,toolbar=no,menubar=no,location=no');

        // axiosInstance.get(`predict.html`)
        //     .then((res) => {
        //         console.log('got predict.html')
        //         console.log(res)
        //     }, (error) => {
        //         console.log(error);
        //     });
    }

    openWebcamModal() {
        this.setState(
            { webcamEnabled: true }, 
            () => {
                document.getElementById("backdrop").style.display = "block";
                document.getElementById("webcamModal").style.display = "block";
                document.getElementById("webcamModal").className += "show";
            }
        );
    }

    closeWebcamModal() {
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("webcamModal").style.display = "none";
        document.getElementById("webcamModal").className += document.getElementById("webcamModal").className.replace("show", "");
        this.setState({ webcamEnabled: false })
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            aspectRatio: 1
        };
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
                                <div id="target" className="col-4">
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
                                    <div id="scrollable" className="scrollable"> 
                                        <div className="container">
                                            <h5>
                                                { this.state.points.map((point, i) => 
                                                    <div key={"point-" + i} className="row">
                                                        <div className="col-6 text-right">{point[0]}</div>
                                                        <div className="col-6 text-left">{point[1]}</div>
                                                    </div>
                                                )}
                                            </h5>
                                        </div>
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
                                    <h5 className="shaded-orange" type="button" onClick={(e) => this.handleRefereeCall("home", e)}>Referee Call</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className="shaded-red game-button">Undo</h5>
                                </div>
                                <div className="col-4">
                                    <h5 className="shaded-orange" type="button" onClick={(e) => this.handleRefereeCall("away", e)}>Referee Call</h5>
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

                { this.state.webcamEnabled &&
                    <div className="modal fade" id="webcamModal" tabIndex="-1" aria-labelledby="webcamModalLabel" aria-modal="true"
                        role="dialog">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="webcamModalLabel">
                                        Make your call
                                    </h5>
                                    <button type="button" className="close" aria-label="Close" onClick={this.closeWebcamModal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center scoreboard">
                                        <Webcam 
                                            videoConstraints={videoConstraints} 
                                            audio={false}
                                            mirrored={true}
                                            style={{width: '100%'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="modal-backdrop fade show" id="backdrop" style={{ display: 'none'}} ></div>
            </div>
        )
    }
}

export default GameScoring;