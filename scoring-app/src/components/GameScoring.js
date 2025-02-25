import React from 'react';
import plus from '../images/plus.png';
import axiosInstance from './axios';
import Webcam from 'react-webcam';

class GameScoring extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {},
            match_done: false,
            points: [], // entries are [home_point_selection, away_point_selection]
            selection: {
                team: 'home', // or "away"
                side: 'R', // or "L"
            },
            prev_point: '', // "home_player_score" or "away_player_score"
            webcamEnabled: false,
            images: [],
            interval: null,
            ref_call: '', // 'home' or 'away', team that asks for a ref call
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
        this.updateScoreboardLocation = this.updateScoreboardLocation.bind(
            this
        );
        this.updatePredictionState = this.updatePredictionState.bind(this);
        this.openWebcamModal = this.openWebcamModal.bind(this);
        this.closeWebcamModal = this.closeWebcamModal.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.takeImage = this.takeImage.bind(this);
        this.handlePrediction = this.handlePrediction.bind(this);
        this.updateDatabaseGame = this.updateDatabaseGame.bind(this);
    }

    componentDidMount() {
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
                    points: this.getInitialPointsState(game_id),
                });

                window.addEventListener('load', this.handleLoad);
                window.addEventListener('resize', this.updateDimensions);
                this.updateDimensions();
            });
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
        window.removeEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate() {
        this.updateDimensions();
    }

    handleLoad() {
        this.updateDimensions();
    }

    // update dimensions of server side points box
    updateDimensions() {
        document.getElementById('scrollable').style['height'] = 0 + 'px';
        const target_height = document.getElementById('target').clientHeight;
        if (target_height < 400) {
            document.getElementById('scrollable').style['height'] =
                target_height + 'px';
        }
    }

    updatePredictionState(game_id, prediction) {
        const data = {
            game_id: game_id,
            prediction: JSON.stringify(prediction),
        };

        axiosInstance.patch(`api/games-prediction`, data).then(
            (res) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    updateScoreboardLocation(new_game) {
        const game_id = this.state.game.game_id;
        const data = {
            game_id: game_id,
            next_game: new_game,
        };

        axiosInstance.patch(`api/games-next-game`, data).then(
            (res) => {
                window.location.href = '/game/' + new_game + '/scoring';
            },
            (error) => {
                console.log(error);
            }
        );
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

    // returns the opposite selection
    not(selection) {
        if (selection === 'R') {
            return 'L';
        } else if (selection === 'L') {
            return 'R';
        } else if (selection === 'home') {
            return 'away';
        } else if (selection === 'away') {
            return 'home';
        }
    }

    // predicts where the next serve is from
    updateSelection(team) {
        var selection = this.state.selection;
        if (selection.team === team) {
            selection.side = this.not(selection.side);
        } else {
            selection.side = 'R'; // default to right side
            selection.team = this.not(selection.team);
        }
        const id = selection.team + '-' + selection.side;
        this.updateServeButtons(id);
        this.setState({ selection: selection });
    }

    // checks condition for game over
    gameOver(game) {
        const win_by_two =
            Math.abs(game.home_player_score - game.away_player_score) >= 2;
        return (
            (game.home_player_score >= 11 || game.away_player_score >= 11) &&
            win_by_two
        );
    }

    handleScorePlusOne(team_score, e) {
        if (e) {
            e.preventDefault();
        }

        // update state
        var game = this.state.game;
        if (!game.done && !this.gameOver(game)) {
            game[team_score] += 1;

            // log serve & point
            var team = team_score.split('_')[0];
            this.updateSelection(team);

            const point = game[team_score] + this.state.selection.side;
            var points = this.state.points;
            if (team === 'home') {
                points.push([point, '']);
            } else {
                points.push(['', point]);
            }
            this.updatePointsState(game.game_id, points);

            // check if game over and update done fields as necessary
            if (this.gameOver(game)) {
                game.done = true;
                this.removePointsState(game.game_id);

                // update match in database
                var match = this.state.match;
                const game_winner =
                    game.home_player_score > game.away_player_score
                        ? 'home_player_score'
                        : 'away_player_score';
                match[game_winner] += 1;

                // check if match is done
                const match_winner =
                    match.home_player_score >= 3 ||
                    match.away_player_score >= 3;
                if (match_winner) {
                    match.done = true;
                }
                this.setState({
                    match: match,
                    match_done: true,
                });

                axiosInstance.patch(`api/matches`, match).then(
                    (res) => {},
                    (error) => {
                        console.log(error);
                    }
                );
            }
        }

        this.setState({
            game: game,
            prev_point: team_score,
        });
        this.updateDatabaseGame(game);
    }

    // undos only one point at a time
    handleUndo(e) {
        const prev_point = this.state.prev_point;
        const game = this.state.game;
        const points = this.state.points;

        points.pop();
        game[prev_point] -= 1;
        this.setState({
            game: game,
            points: points,
            prev_point: '',
        });

        this.updatePointsState(game.game_id, points);
        this.updateDatabaseGame(game);
    }

    updateDatabaseGame(game) {
        axiosInstance.patch(`api/games`, game).then(
            (res) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    handleBeginNextGame(match_id, game_number, e) {
        e.preventDefault();
        const data = {
            match_id: match_id,
            game_number: game_number,
        };

        // create a new game and go to that new page
        axiosInstance.post(`api/games`, data).then(
            (res) => {
                const game_id = res.data.game_id;
                this.updateScoreboardLocation(game_id);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    updateServeButtons(id) {
        var buttons = document.getElementsByClassName('serve-change');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('shaded-blue');
        }
        document.getElementById(id).classList.add('shaded-blue');
    }

    handleServeChange(e) {
        const id = e.target.id.split('-');
        var selection = this.state.selection;
        selection.team = id[0];
        selection.side = id[1];
        this.setState({ selection: selection });
        this.updateServeButtons(e.target.id);
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    };

    capture() {
        const imageSrc = this.webcam.getScreenshot();
        return imageSrc;
    }

    takeImage() {
        if (this.state.images.length > 15) {
            clearInterval(this.state.interval);
            this.handlePrediction();
        } else {
            var images = this.state.images;
            images.push(this.capture());
            this.setState({ images: images });
        }
    }

    handlePrediction() {
        var data = {
            images: this.state.images,
        };

        document.getElementById('note-call').style.display = 'none';
        document.getElementById('note-processing').style.display = 'block';

        // get prediction based on images
        axiosInstance.post(`api/predict_ref_signal`, data).then(
            (res) => {
                const team = this.state.ref_call;
                const game_id = this.state.game.game_id;
                const prediction = {
                    call: res.data.prediction,
                    team: this.state.match[team + '_team_name'],
                };
                var toDisplay;

                document.getElementById('note-processing').style.display =
                    'none';

                if (prediction.call === 'inconclusive') {
                    // enforce redo for inconclusive prediction
                    toDisplay =
                        'Your prediction was inconclusive. Please select OK to try again.';
                    if (window.confirm(toDisplay)) {
                        this.handleRefereeCall(team);
                    } else {
                        this.closeWebcamModal(true);
                    }
                } else {
                    // confirm prediction with user
                    toDisplay =
                        'Here is your prediction: ' +
                        prediction.call +
                        '\n\nPlease select OK if the prediction looks correct. Otherwise, press cancel and input your prediction again.';

                    if (window.confirm(toDisplay)) {
                        // increment scores based on prediction if necessary
                        if (prediction.call === 'STROKE') {
                            this.handleScorePlusOne(
                                team + '_player_score',
                                null
                            );
                        } else if (prediction.call === 'NO LET') {
                            this.handleScorePlusOne(
                                this.not(team) + '_player_score',
                                null
                            );
                        }

                        this.updatePredictionState(game_id, prediction);
                        this.closeWebcamModal(false);
                    } else {
                        this.handleRefereeCall(team);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }

    // take pictures to act as a video
    handleRefereeCall(team) {
        this.setState({ ref_call: team });
        this.setState({ images: [] }, () => {
            document.getElementById('note-loading').style.display = 'none';
            document.getElementById('note-call').style.display = 'block';
            var interval = setInterval(this.takeImage.bind(this), 100);
            this.setState({ interval: interval });
        });
    }

    openWebcamModal(e, _callback) {
        if (!this.state.game.done) {
            this.setState({ webcamEnabled: true }, () => {
                const team = arguments[2];
                document.getElementById('backdrop').style.display = 'block';
                document.getElementById('webcamModal').style.display = 'block';
                document.getElementById('webcamModal').className += 'show';
                document.getElementById('note-loading').style.display = 'block';

                // wait until the camera has loaded and returned a real picture to start saving images
                var interval = setInterval(
                    function () {
                        var image = this.capture();
                        if (image != null) {
                            clearInterval(interval);
                            _callback(team);
                        }
                    }.bind(this),
                    50
                );
            });
        }
    }

    closeWebcamModal(reload) {
        document.getElementById('backdrop').style.display = 'none';
        document.getElementById('webcamModal').style.display = 'none';
        document.getElementById(
            'webcamModal'
        ).className += document
            .getElementById('webcamModal')
            .className.replace('show', '');
        this.setState({ webcamEnabled: false });

        // reload the page if necessary to stop pictures from being taken and close camera
        if (reload) {
            window.location.reload(false);
        }
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            aspectRatio: 1,
            facingMode: 'user',
        };
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container">
                        <h1
                            className="heading-size-1"
                            style={{ marginTop: '5%', marginBottom: '5%' }}
                        >
                            Game Scoring
                        </h1>

                        <div
                            className="container"
                            style={{ paddingRight: '10%', paddingLeft: '10%' }}
                        >
                            <div className="row">
                                <div className="col-4">
                                    <h4 className="heading-size-4 shaded-gray text-break">
                                        {this.state.match.home_team_name}
                                    </h4>
                                </div>
                                <div className="col-4 align-self-center">
                                    <h5 className="heading-size-5">
                                        {' '}
                                        {
                                            this.state.match.home_player_score
                                        } | {this.state.match.away_player_score}{' '}
                                    </h5>
                                </div>
                                <div className="col-4">
                                    <h4 className="heading-size-4 shaded-gray text-break">
                                        {this.state.match.away_team_name}
                                    </h4>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="heading-size-5 shaded-gray text-break">
                                        <span>
                                            {this.state.match.home_player_name}
                                        </span>
                                    </h5>
                                </div>
                                <div className="col-4 align-self-center">
                                    <h1 className="heading-size-1">
                                        {this.state.game.home_player_score} |{' '}
                                        {this.state.game.away_player_score}
                                    </h1>
                                </div>
                                <div className="col-4">
                                    <h5 className="heading-size-5 shaded-gray text-break">
                                        <span>
                                            {this.state.match.away_player_name}
                                        </span>
                                    </h5>
                                </div>
                            </div>
                            <div className="row">
                                <div id="target" className="col-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                className="shaded-gray"
                                                onClick={(e) =>
                                                    this.handleScorePlusOne(
                                                        'home_player_score',
                                                        e
                                                    )
                                                }
                                            >
                                                <img
                                                    src={plus}
                                                    className="img-fluid w-75"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3
                                                id="home-L"
                                                className="heading-size-3 serve-change game-button"
                                                onClick={this.handleServeChange}
                                            >
                                                L
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3
                                                id="home-R"
                                                className="heading-size-3 serve-change game-button shaded-blue"
                                                onClick={this.handleServeChange}
                                            >
                                                R
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div id="scrollable" className="scrollable">
                                        <div className="container">
                                            <h5 className="heading-size-5">
                                                {this.state.points.map(
                                                    (point, i) => (
                                                        <div
                                                            key={'point-' + i}
                                                            className="row"
                                                        >
                                                            <div className="col-6 text-right">
                                                                {point[0]}
                                                            </div>
                                                            <div className="col-6 text-left">
                                                                {point[1]}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <button
                                                className="shaded-gray"
                                                onClick={(e) =>
                                                    this.handleScorePlusOne(
                                                        'away_player_score',
                                                        e
                                                    )
                                                }
                                            >
                                                <img
                                                    src={plus}
                                                    className="img-fluid w-75"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3
                                                id="away-L"
                                                className="heading-size-3 serve-change game-button"
                                                onClick={this.handleServeChange}
                                            >
                                                L
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <h3
                                                id="away-R"
                                                className="heading-size-3 serve-change game-button"
                                                onClick={this.handleServeChange}
                                            >
                                                R
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <h5
                                        className="heading-size-5 game-button shaded-orange"
                                        onClick={(e) =>
                                            this.openWebcamModal(
                                                e,
                                                this.handleRefereeCall,
                                                'home'
                                            )
                                        }
                                    >
                                        Referee Call
                                    </h5>
                                </div>
                                <div className="col-4">
                                    {this.state.prev_point !== '' &&
                                        !this.state.game.done && (
                                            <h5
                                                className="heading-size-5 shaded-red game-button"
                                                onClick={this.handleUndo}
                                            >
                                                Undo
                                            </h5>
                                        )}
                                    {(this.state.prev_point === '' ||
                                        this.state.game.done) && (
                                        <h5 className="heading-size-5 shaded-red-disabled game-button">
                                            Undo
                                        </h5>
                                    )}
                                </div>
                                <div className="col-4">
                                    <h5
                                        className="heading-size-5 game-button shaded-orange"
                                        onClick={(e) =>
                                            this.openWebcamModal(
                                                e,
                                                this.handleRefereeCall,
                                                'away'
                                            )
                                        }
                                    >
                                        Referee Call
                                    </h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    {this.state.game.done &&
                                        !this.state.match.done && (
                                            <button
                                                className="btn btn-secondary btn-block btn-lg"
                                                onClick={(e) =>
                                                    this.handleBeginNextGame(
                                                        this.state.match
                                                            .match_id,
                                                        this.state.game
                                                            .game_number + 1,
                                                        e
                                                    )
                                                }
                                            >
                                                START GAME #
                                                {this.state.game.game_number +
                                                    1}
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <a
                        className="nav-link"
                        href={
                            '/game/' + this.state.game.game_id + '/scoreboard'
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        Scoreboard View
                    </a>
                    <a
                        className="nav-link"
                        href={'/matchup/' + this.state.match.team_match_id}
                    >
                        Back to Team Matchup
                    </a>
                </footer>

                {/* ref call webcam modal */}
                {this.state.webcamEnabled && (
                    <div
                        className="modal fade"
                        id="webcamModal"
                        tabIndex="-1"
                        aria-labelledby="webcamModalLabel"
                        aria-modal="true"
                        role="dialog"
                    >
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="heading-size-5 modal-title"
                                        id="webcamModalLabel"
                                    >
                                        Referee Call
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        aria-label="Close"
                                        onClick={(e) =>
                                            this.closeWebcamModal(true)
                                        }
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center scoreboard">
                                        <Webcam
                                            audio={false}
                                            ref={this.setRef}
                                            screenshotFormat="image/jpeg"
                                            videoConstraints={videoConstraints}
                                            mirrored={true}
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                    <div
                                        id="note-loading"
                                        style={{ display: 'none' }}
                                    >
                                        Loading...
                                    </div>
                                    <div
                                        id="note-call"
                                        style={{ display: 'none' }}
                                    >
                                        Make Your Call
                                    </div>
                                    <div
                                        id="note-processing"
                                        style={{ display: 'none' }}
                                    >
                                        Processing...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="modal-backdrop fade show"
                    id="backdrop"
                    style={{ display: 'none' }}
                ></div>
            </div>
        );
    }
}

export default GameScoring;
