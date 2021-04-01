import React from 'react';
import axiosInstance from './axios';

class GameScoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {},
            prediction: {},
            interval: null,
        };

        this.updateStateFromDatabase = this.updateStateFromDatabase.bind(this);
        this.openRefCallModal = this.openRefCallModal.bind(this);
        this.closeRefCallModal = this.closeRefCallModal.bind(this);
    }

    componentDidMount() {
        var interval = setInterval(this.updateStateFromDatabase, 3000);
        this.setState({ interval: interval });
    }

    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    updateStateFromDatabase() {
        const game_id = window.location.pathname.split('/')[2];
        axiosInstance
            .get(`api/games`, {
                params: {
                    game_id: game_id,
                },
            })
            .then((res) => {
                const data = res.data;
                this.setState({
                    game: data.game_data,
                    match: data.match_data,
                });

                // show prediction if exists
                const prediction = data.game_data.prediction;
                if (prediction) {
                    this.handlePrediction(game_id, prediction);
                }

                // redirect if a new game starts
                const next_game = data.game_data.next_game;
                if (next_game) {
                    this.handleNextGame(next_game);
                }
            });
    }

    handlePrediction(game_id, game_prediction) {
        const prediction = JSON.parse(game_prediction);
        this.setState({ prediction: prediction }, () => {
            axiosInstance
                .get(`api/games-prediction`, {
                    params: {
                        game_id: game_id,
                    },
                })
                .then((res) => {
                    this.openRefCallModal();
                });
        });
    }

    handleNextGame(next_game) {
        window.location.href = '/game/' + next_game + '/scoreboard';
    }

    openRefCallModal() {
        document.getElementById('backdrop').style.display = 'block';
        document.getElementById('refCallModal').style.display = 'block';
        document.getElementById('refCallModal').className += 'show';

        // close modal after 5 seconds
        setTimeout(this.closeRefCallModal, 5000);
    }

    closeRefCallModal() {
        document.getElementById('backdrop').style.display = 'none';
        document.getElementById('refCallModal').style.display = 'none';
        document.getElementById(
            'refCallModal'
        ).className += document
            .getElementById('refCallModal')
            .className.replace('show', '');
    }

    render() {
        return (
            <div className="container" style={{ marginBottom: '5%' }}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>
                    Game Scoreboard
                </h1>

                <div className="container shaded-gray">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-left">
                                {this.state.match.home_team_name}
                            </h4>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h4 className="text-right">
                                {this.state.match.away_team_name}
                            </h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 shaded-dark-gray my-auto pt-2 pb-1">
                            <h3 className="text-left text-light">
                                {this.state.match.home_player_name}
                            </h3>
                        </div>
                        <div className="col-2 align-self-center text-nowrap">
                            <h1>
                                {this.state.match.home_player_score} |{' '}
                                {this.state.match.away_player_score}
                            </h1>
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
                        <div className="col-2"></div>
                        <div className="col-5 text-center scoreboard">
                            {this.state.game.away_player_score}
                        </div>
                    </div>
                </div>

                <div>
                    <div
                        className="modal fade"
                        id="refCallModal"
                        tabIndex="-1"
                        aria-labelledby="refCallModalLabel"
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="refCallModalLabel"
                                    >
                                        Referee Call Requested By{' '}
                                        {this.state.prediction.team}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        aria-label="Close"
                                        onClick={this.closeRefCallModal}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center scoreboard">
                                        {this.state.prediction.call}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop fade show"
                        id="backdrop"
                        style={{ display: 'none' }}
                    ></div>
                </div>
            </div>
        );
    }
}

export default GameScoreboard;
