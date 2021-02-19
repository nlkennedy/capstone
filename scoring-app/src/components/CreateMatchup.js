import React from 'react';
import axios from 'axios';

class CreateMatchup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamA: "",
            teamB: "",
            playersA: Array(9).fill(""),
            playersB: Array(9).fill(""),
            courts: Array(9).fill("")
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    handleTitleInputChange(event) {
        console.log("handle title input change")
        console.log(event)
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

    // READY TO DO THIS
    handleSubmit = event => {
        event.preventDefault();
        for(var i = 0; i < event.target.length; i++) {
            console.log(event.target[i].value)
        }
        console.log(event.target[0].value)

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
                                    name="teamA"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Team A"
                                    value={this.state.teamA}
                                    onChange={this.handleTitleInputChange} />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                <input 
                                    name="teamB"
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Team B"
                                    value={this.state.teamB}
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
                                    name={"playersA/" + i}
                                    type="text" 
                                    className="form-control" 
                                    placeholder={"Player " + (i + 1) + "A"}
                                    value={this.state.playersA[i]}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-sm-4 form-group">
                                <input 
                                    name={"playersB/" + i}
                                    type="text" 
                                    className="form-control" 
                                    placeholder={"Player " + (i + 1) + "B"}
                                    value={this.state.playersB[i]}
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