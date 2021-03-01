import React from 'react';
import axios from 'axios';

class CreateMatchup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // change default to "" when finished testing 
            homeTeam: "Tufts",
            awayTeam: "Bowdoin",
            homePlayers: ["homeA", "homeB", "homeC", "homeD", "homeE", "homeF", "homeG", "homeH", "homeI"], //Array(9).fill(""),
            awayPlayers: ["awayA", "awayB", "awayC", "awayD", "awayE", "awayF", "awayG", "awayH", "awayI"], //Array(9).fill(""),
            courts: [1, 2, 3, 4, 5, 6, 7, 8, 9] // Array(9).fill("")
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    handleTitleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name.split('/');
        const i = name[1];
        const state_name = name[0];
        
        var newInfo = this.state[state_name].slice();
        newInfo[i] = value;

        this.setState({
          [state_name]: newInfo
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        // add type checking and make sure all fields are filled 
        // Check inputs for special characters and don't allow to be submitted
        var specialChars = /[^a-zA-Z0-9 ]/g;
        //var non_nums = /[^0-9.]/g;
        if (this.state.homeTeam.match(specialChars) || this.state.awayTeam.match(specialChars)) {
            alert('Only characters A-Z, a-z and 0-9, are allowed.')
            return
        }
        for (var j = 0; j < 9; j++) {
            if (this.state.homePlayers[j].match(specialChars) || this.state.awayPlayers[j].match(specialChars)) {
                    alert('Only characters A-Z, a-z and 0-9, are allowed.')
                    return
                }
            if (!Number.isInteger(this.state.courts[j])) {
                    alert('Court number must be an integer.')
                    this.state.courts[j] = j+1
                    return
            }
        }
      
        // condense data 
        var matches = [];
        for (var i = 0; i < 9; i++) {
            const match = {
                'home_player': this.state.homePlayers[i],
                'away_player': this.state.awayPlayers[i],
                'court_number': this.state.courts[i],
                'match_rank': i + 1,
            }

            matches.push(match);
        }

        var data = {
            'home_team_name': this.state.homeTeam,
            'away_team_name': this.state.awayTeam,
            'matches': matches
        }

        axios.post(`http://localhost:8000/api/teammatches-all`, data)
            .then((res) => {
                const team_match_id = res.data.team_match_id
                window.location.href = '/matchup/' + team_match_id;
            }, (error) => {
                console.log(error);
            });
      }

    render() {
        const team_match_length = 9;
        return (
            <div className="container">

                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>New Team Matchup</h1>

                <form className="form-box" onSubmit={this.handleSubmit}>
                    <div className="matchup-row form-row">
                        <div className="col-sm-1">
                            <h4>#</h4>
                        </div>
                        <div className="col-sm-4">                            
                            <div className="form-group">
                                <input 
                                    name="homeTeam"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Home Team"
                                    value={this.state.homeTeam}
                                    onChange={this.handleTitleInputChange} />
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
                                    onChange={this.handleTitleInputChange} />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Court</h4>
                        </div>
                    </div>

                    {[...Array(team_match_length)].map((e, i) => 
                        <div key={"match" + i} className="form-row">
                            <div className="col-sm-1 form-group">
                                <h4>{i + 1}</h4>
                            </div>
                            <div className="col-sm-4 form-group">
                                <input 
                                    name={"homePlayers/" + i}
                                    type="text" 
                                    className="form-control" 
                                    placeholder={"Home Player " + (i + 1)}
                                    value={this.state.homePlayers[i]}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-sm-4 form-group">
                                <input 
                                    name={"awayPlayers/" + i}
                                    type="text" 
                                    className="form-control" 
                                    placeholder={"Away Player " + (i + 1)}
                                    value={this.state.awayPlayers[i]}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-sm-3 form-group">
                                <input
                                    name={"courts/" + i}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="#"
                                    value={this.state.courts[i]}
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                    )}

                    <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                        <button type="submit" className="btn btn-secondary">Create</button>
                    </div>
                    
                </form>

            </div>
        )
    }
}

export default CreateMatchup;