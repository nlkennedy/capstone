import React from 'react';
import axios from 'axios';

class CreateMatchup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // change default to "" when finished testing 
            homeTeam: "Tufts",
            awayTeam: "Colby",
            homePlayers: Array(9).fill("a"),
            awayPlayers: Array(9).fill("b"),
            courts: Array(9).fill("2")
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

        var matches = [];
        for (var i = 0; i < 9; i++) {
            const match = {
                'home_player': this.state.homePlayers[i],
                'away_player': this.state.awayPlayers[i],
                'court': this.state.courts[i],
                'match_rank': i + 1,
            }
            matches.push(match);
        }

        var data = {
            'home_team_name': this.state.homeTeam,
            'away_team_name': this.state.awayTeam,
            'matches': matches
        }

        console.log("data")
        console.log(data)


        // for(var i = 0; i < event.target.length; i++) {
        //     console.log(event.target[i].value)
        // }
        // console.log(event.target[0].value)

        // axios.post(`http://localhost:8000/api/teammatches-all`, { })
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //   })
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