import React from 'react';
import axiosInstance from './axios';

class GameScoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {}
        };

        this.updateStateFromDatabase = this.updateStateFromDatabase.bind(this);
        this.updateState = this.updateState.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('storage', this.updateState);
        }
        this.updateState();
    }

    componentWillUnmount(){
        if (typeof window !== 'undefined') {
            window.removeEventListener('storage', this.updateState);
        }
    }

    updateStateFromDatabase() {
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
            });
        });
    }

    updateState() {
        const game_id = window.location.pathname.split('/')[2];
        const game = JSON.parse(localStorage.getItem('game-' + game_id)) || {};
        const match = JSON.parse(localStorage.getItem('match-' + game_id)) || {};

        if (Object.keys(game).length === 0 || Object.keys(match).length === 0) {
            this.updateStateFromDatabase();
        } else {
            this.setState({ game: game });
            this.setState({ match: match });
        }
    }

     openModal() {
        document.getElementById("backdrop").style.display = "block";
        document.getElementById("refCallModal").style.display = "block";
        document.getElementById("refCallModal").className += "show";

        // close modal after 5 seconds
        setTimeout(this.closeModal, 5000);
    }

     closeModal() {
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("refCallModal").style.display = "none";
        document.getElementById("refCallModal").className += document.getElementById("refCallModal").className.replace("show", "");
    }

    render() {
        return (
            <div className="container" style={{ marginBottom: '5%'}}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoreboard</h1>

                <div className="container shaded-gray">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-left">{this.state.match.home_team_name}</h4>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h4 className="text-right">{this.state.match.away_team_name}</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 shaded-dark-gray my-auto pt-2 pb-1">
                            <h3 className="text-left text-light">
                                {this.state.match.home_player_name}
                            </h3>
                        </div>
                        <div className="col-2 align-self-center text-nowrap">
                            <h1>{this.state.match.home_player_score} | {this.state.match.away_player_score}</h1>
                        </div>
                        <div className="col-5 shaded-dark-gray my-auto pt-2 pb-1">
                            <h3 className="text-right text-light">
                                {this.state.match.away_player_name}
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 text-center scoreboard">
                            {this.state.game.home_player_score}
                        </div>
                        <div className="col-2">
                        </div>
                        <div className="col-5 text-center scoreboard">
                            {this.state.game.away_player_score}
                        </div>
                    </div>
                </div>

                <div>
                    <button type="button" className="btn btn-primary" onClick={this.openModal}>
                        Temporary Modal button
                    </button>
                    <div className="modal fade" id="refCallModal" tabIndex="-1" aria-labelledby="refCallModalLabel" aria-modal="true" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="refCallModalLabel">
                                        Referee Call Made By ----
                                    </h5>
                                    <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center scoreboard">
                                        LET
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show" id="backdrop" style={{ display: 'none'}} ></div>
                </div>
            </div>
        )
    }
}

export default GameScoreboard;