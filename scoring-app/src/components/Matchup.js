import React from 'react';
import {Link} from 'react-router';

class Matchup extends React.Component {
    render() {
        return (
            <div class="container">
                <h1 style={{ marginTop: '5%' }} >Matchup</h1>
                <h2 style={{ marginBottom: '5%' }}>Team 1 vs Team 2</h2>

                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th class="w-5 matchup-header" scope="col">#</th>
                            <th class="w-25 team1-winner" scope="col">Team A</th>
                            <th class="w-40 matchup-header" scope="col">Game</th>
                            <th class="w-25 team2-winner" scope="col">Team B</th>
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

            </div>
        )
    }
}

export default Matchup;