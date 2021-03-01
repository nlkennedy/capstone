import React from 'react';
import axiosInstance from './axios';

class GameScoreboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
            match: {},
        };
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
            });
        });
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
                            <h5 className="text-left text-light">
                                {this.state.match.home_player_name}
                            </h5>
                        </div>
                        <div className="col-2 align-self-center text-nowrap ">
                            <h1>{this.state.match.home_player_score} | {this.state.match.away_player_score}</h1>
                        </div>
                        <div className="col-5 shaded-dark-gray my-auto pt-2 pb-1">
                            <h5 className="text-right text-light">
                                {this.state.match.away_player_name}
                            </h5>
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
            </div>
        )
    }
}

export default GameScoreboard;