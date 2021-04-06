import React from 'react';
import axiosInstance from './axios';

class CreateMatchup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTeam: '',
            awayTeam: '',
            homePlayers: Array(9).fill(''),
            awayPlayers: Array(9).fill(''),
            courts: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
        this.openValidationModal = this.openValidationModal.bind(this);
        this.closeValidationModal = this.closeValidationModal.bind(this);
    }

    // update state for every title change
    handleTitleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    // update state for every form input change
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name.split('/');
        const i = name[1];
        const state_name = name[0];

        var newInfo = this.state[state_name].slice();
        newInfo[i] = value;

        this.setState({
            [state_name]: newInfo,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // form validation: all fields are required and special characters are not allowed
        var specialChars = /[^a-zA-Z0-9 ]/g;

        // validate team names
        if (
            this.state.homeTeam.match(specialChars) ||
            this.state.awayTeam.match(specialChars)
        ) {
            this.openValidationModal(
                'Only characters A-Z, a-z and 0-9, are allowed.'
            );
            return;
        }

        if (this.state.homeTeam === '' || this.state.awayTeam === '') {
            this.openValidationModal('All fields are required.');
            return;
        }

        // validate homePlayers, awayPlayers, courts
        for (var j = 0; j < 9; j++) {
            if (
                this.state.homePlayers[j] === '' ||
                this.state.awayPlayers[j] === '' ||
                this.state.courts[j] === ''
            ) {
                this.openValidationModal('All fields are required.');
                return;
            }

            if (
                this.state.homePlayers[j].match(specialChars) ||
                this.state.awayPlayers[j].match(specialChars)
            ) {
                this.openValidationModal(
                    'Only characters A-Z, a-z and 0-9, are allowed.'
                );
                return;
            }

            if (!Number.isInteger(+this.state.courts[j])) {
                this.openValidationModal('Court number must be an integer.');
                return;
            }
        }

        // condense data
        var matches = [];
        for (var i = 0; i < 9; i++) {
            const match = {
                home_player: this.state.homePlayers[i],
                away_player: this.state.awayPlayers[i],
                court_number: this.state.courts[i],
                match_rank: i + 1,
            };

            matches.push(match);
        }

        var data = {
            home_team_name: this.state.homeTeam,
            away_team_name: this.state.awayTeam,
            matches: matches,
        };

        // create matchup
        axiosInstance.post(`api/teammatches-all`, data).then(
            (res) => {
                const team_match_id = res.data.team_match_id;
                window.location.href = '/matchup/' + team_match_id;
            },
            (error) => {
                console.log(error);
            }
        );
    };

    openValidationModal(message) {
        this.setState({ validationMessage: message });
        document.getElementById('backdrop').style.display = 'block';
        document.getElementById('validationModal').style.display = 'block';
        document.getElementById('validationModal').className += 'show';
    }

    closeValidationModal() {
        document.getElementById('backdrop').style.display = 'none';
        document.getElementById('validationModal').style.display = 'none';
        document.getElementById(
            'validationModal'
        ).className += document
            .getElementById('validationModal')
            .className.replace('show', '');
    }

    render() {
        const team_match_length = 9;
        return (
            <div className="container">
                <h1
                    className="heading-size-1"
                    style={{ marginTop: '5%', marginBottom: '5%' }}
                >
                    New Team Matchup
                </h1>

                <form className="form-box" onSubmit={this.handleSubmit}>
                    <div className="matchup-row form-row">
                        <div className="col-sm-1">
                            <h4 className="heading-size-4">#</h4>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <input
                                    name="homeTeam"
                                    type="text"
                                    className="form-control"
                                    placeholder="Home Team"
                                    value={this.state.homeTeam}
                                    onChange={this.handleTitleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <input
                                    name="awayTeam"
                                    type="text"
                                    className="form-control"
                                    placeholder="Away Team"
                                    value={this.state.awayTeam}
                                    onChange={this.handleTitleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4 className="heading-size-4">Court</h4>
                        </div>
                    </div>

                    {[...Array(team_match_length)].map((e, i) => (
                        <div key={'match' + i} className="form-row">
                            <div className="col-sm-1 form-group">
                                <h4 className="heading-size-4">{i + 1}</h4>
                            </div>
                            <div className="col-sm-4 form-group">
                                <input
                                    name={'homePlayers/' + i}
                                    type="text"
                                    className="form-control"
                                    placeholder={'Home Player ' + (i + 1)}
                                    value={this.state.homePlayers[i]}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-sm-4 form-group">
                                <input
                                    name={'awayPlayers/' + i}
                                    type="text"
                                    className="form-control"
                                    placeholder={'Away Player ' + (i + 1)}
                                    value={this.state.awayPlayers[i]}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col-sm-3 form-group">
                                <input
                                    name={'courts/' + i}
                                    type="text"
                                    className="form-control"
                                    placeholder="#"
                                    value={this.state.courts[i]}
                                    onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                        <button type="submit" className="btn btn-secondary">
                            Create
                        </button>
                    </div>
                </form>

                <div
                    className="modal fade"
                    id="validationModal"
                    tabIndex="-1"
                    aria-labelledby="validationModalLabel"
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="heading-size-5 modal-title"
                                    id="validationModalLabel"
                                >
                                    Please review your submission.
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={this.closeValidationModal}
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body text-left">
                                {this.state.validationMessage}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={this.closeValidationModal}
                                >
                                    OK
                                </button>
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
        );
    }
}

export default CreateMatchup;
