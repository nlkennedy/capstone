import React from 'react';
// import profile from '../images/person.jpg';
import plus from '../images/plus.png';
import axios from 'axios';

class GameScoring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {}
        };
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
                                <div className="col-4"></div>
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
                                            <div className="shaded-gray">
                                                <img src={plus} className="img-fluid w-75" alt="" />
                                            </div>
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
                                            <div className="shaded-gray">
                                                <img src={plus} className="img-fluid w-75" alt="" />
                                            </div>
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