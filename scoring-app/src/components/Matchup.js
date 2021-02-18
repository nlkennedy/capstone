import React from 'react';
import axios from 'axios';

class Matchup extends React.Component {
    state = {
        info: {},
        matches: []
    }

    // componentDidMount() {
    //     console.log(window.location.pathname.split('/')[2]);
    //     axios.get(`http://localhost:8000/api/matches-summary`, {
    //         params: {
    //             team_match_id: window.location.pathname.split('/')[2]
    //         }
    //     }).then(res => {
    //         const data = res.data;
    //         this.setState({ info: data, matches: data.matches });
    //     })
    // }

    async componentDidMount() {

        // Make first two requests
        const [firstResponse] = await Promise.all([
            axios.get(`http://localhost:8000/api/matches-summary`, {
                params: {
                    team_match_id: window.location.pathname.split('/')[2]
                }
            })
        ]);
      
        // Make third request using responses from the first two
        console.log(firstResponse.data.matches[0].pk)
        
        const secondResponse = await axios.get(`http://localhost:8000/api/games-summary`, {
            params: {
                match_id: firstResponse.data.matches[0].pk
            }
        });
      
        // Update state once with all 3 responses
        this.setState({
            info: firstResponse.data, 
            matches: firstResponse.data.matches,
            games: secondResponse.data.sort((a, b) => (a.game_number > b.game_number) ? 1 : -1)
        });
      
    }
    

    render() {
        const match_length = new Array(5);
        return (
            <div class="container">
                <h1 style={{ marginTop: '5%' }} >Matchup</h1>
                <h2 style={{ marginBottom: '5%' }}>{ this.state.info.home_team_name } vs { this.state.info.away_team_name } </h2>

                { JSON.stringify(this.state.games) }

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="w-5 matchup-header" scope="col">#</th>
                            <th class="w-25 team1-winner" scope="col">{ this.state.info.home_team_name }</th>
                            <th class="w-40 matchup-header" scope="col">Game</th>
                            <th class="w-25 team2-winner" scope="col">{ this.state.info.away_team_name }</th>
                            <th class="w-5 matchup-header" scope="col">Court</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Player 1A</td>
                            <td>
                                <table class="table table-sm table-bordered table-game-sum table-fixed">
                                    <tbody>
                                        <tr>
                                            <td width="20%" class="team1-winner">11</td>
                                            <td width="20%">5</td>
                                            <td width="20%">8</td>
                                            <td width="20%"class="team1-winner">11</td>
                                            <td width="20%">5</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td class="team2-winner">11</td>
                                            <td class="team2-winner">11</td>
                                            <td>4</td>
                                            <td class="team2-winner">11</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td class="team2-winner" >Player 1B</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td class="team1-winner">Player 1B</td>
                            <td>
                                <table class="table table-sm table-bordered table-game-sum table-fixed">
                                    <tbody>
                                        <tr>
                                            <td width="20%" class="team1-winner">11</td>
                                            <td width="20%" class="team1-winner">11</td>
                                            <td width="20%" class="team1-winner">11</td>
                                            <td width="20%"></td>
                                            <td width="20%"></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>7</td>
                                            <td>4</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>Player 2B</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Player 1C</td>
                            <td>
                                <a href="/game/:game_id/scoring">BEGIN MATCH</a>
                            </td>
                            <td>Player 2C</td>
                            <td>3</td>
                        </tr>
                    </tbody>
                </table>




                BREAK

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="w-5 matchup-header" scope="col">#</th>
                            <th class="w-25 team1-winner" scope="col">{ this.state.info.home_team_name }</th>
                            <th class="w-40 matchup-header" scope="col">Game</th>
                            <th class="w-25 team2-winner" scope="col">{ this.state.info.away_team_name }</th>
                            <th class="w-5 matchup-header" scope="col">Court</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.matches.map(match => 
                            <tr>
                                <th scope="row"> {match.match_rank} </th>
                                <td> {match.home_player_name} </td>
                                <td>
                                    { !match.done && this.state.games.length == 0 && 
                                        <a href="/game/:game_id/scoring">BEGIN MATCH</a>
                                    }
                                    { !match.done && this.state.games.length > 0 && 
                                        <a href="/game/:game_id/scoring">CONTINUE MATCH</a>
                                    }
                                    { this.state.games.length > 0 && 
                                        <table class="table table-sm table-bordered table-game-sum table-fixed">
                                            <tbody>
                                                <tr>
                                                    { this.state.games.map(game => 
                                                        <td width="20%">{game.home_player_score}</td>
                                                    )}
                                                    { [...Array(5 - this.state.games.length)].map((e, i) => <td width="20%"></td>) }
                                                </tr>
                                                <tr>
                                                    { this.state.games.map(game => 
                                                        <td width="20%">{game.away_player_score}</td>
                                                    )}
                                                    { [...Array(5 - this.state.games.length)].map((e, i) => <td width="20%"></td>) }
                                                </tr>
                                            </tbody>
                                        </table>
                                    }
                                    
                                </td>
                                <td> {match.away_player_name} </td>
                                <td> {match.court_number} </td>
                            </tr>
                        )}
                        
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Matchup;