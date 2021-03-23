import React from 'react';
import axiosInstance from './axios';
import axios from 'axios';

class Summary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            matches: [],
        };
    }

    async componentDidMount() {
        var game_data = [];
        var $this = this;

        // get matches summary which contains all match ids
        const [matches_summary] = await Promise.all([
            axiosInstance.get(`api/matches-summary`, {
                params: {
                    team_match_id: window.location.pathname.split('/')[2],
                },
            }),
        ]);

        // make request for every match to get the game summary
        axios
            .all(
                matches_summary.data.matches.map((match) =>
                    axiosInstance.get(`api/games-summary`, {
                        params: {
                            match_id: match.pk,
                        },
                    })
                )
            )
            .then(
                axios.spread(function (...responses) {
                    // add game summary to each match
                    game_data = responses.map((response) => response.data);
                    var matches = matches_summary.data.matches.map(function (
                        match,
                        i
                    ) {
                        // sort games by game number
                        match['games'] = game_data[i].sort((a, b) =>
                            a.game_number > b.game_number ? 1 : -1
                        );
                        return match;
                    });

                    $this.setState({
                        info: matches_summary.data,
                        matches: matches,
                    });
                })
            );
    }

    render() {
        const match_length = 5;
        return (
            <div>
                <div id="wrap">
                    <div id="main" className="container">
                        <h1 style={{ marginTop: '5%' }}>Matchup Summary</h1>
                        <h2 style={{ marginBottom: '5%' }}>
                            {this.state.info.home_team_name} vs{' '}
                            {this.state.info.away_team_name}{' '}
                        </h2>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th
                                        className="w-25 team1-winner"
                                        scope="col"
                                    >
                                        {this.state.info.home_team_name}
                                    </th>
                                    <th
                                        className="w-50 matchup-header"
                                        scope="col"
                                    >
                                        Game
                                    </th>
                                    <th
                                        className="w-25 team2-winner"
                                        scope="col"
                                    >
                                        {this.state.info.away_team_name}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.matches.map((match) => (
                                    <tr key={'match-' + match.pk}>
                                        <td
                                            className={
                                                match.done &&
                                                match.home_player_score >
                                                    match.away_player_score
                                                    ? 'team1-winner'
                                                    : ''
                                            }
                                        >
                                            {' '}
                                            {match.home_player_name}{' '}
                                        </td>
                                        <td>
                                            <table className="table table-sm table-bordered table-game-sum table-fixed">
                                                <tbody>
                                                    <tr>
                                                        {match.games.map(
                                                            (game) => (
                                                                <td
                                                                    key={
                                                                        'game-' +
                                                                        game.pk
                                                                    }
                                                                    className={
                                                                        game.done &&
                                                                        game.home_player_score >
                                                                            game.away_player_score
                                                                            ? 'team1-winner'
                                                                            : ''
                                                                    }
                                                                    width="20%"
                                                                >
                                                                    {
                                                                        game.home_player_score
                                                                    }
                                                                </td>
                                                            )
                                                        )}
                                                        {match.games.length <
                                                            5 &&
                                                            [
                                                                ...Array(
                                                                    match_length -
                                                                        match
                                                                            .games
                                                                            .length
                                                                ),
                                                            ].map((e, i) => (
                                                                <td
                                                                    className="text-light"
                                                                    key={
                                                                        'game-filler-home-' +
                                                                        match.pk +
                                                                        '-' +
                                                                        i
                                                                    }
                                                                    width="20%"
                                                                >
                                                                    0
                                                                </td>
                                                            ))}
                                                    </tr>
                                                    <tr>
                                                        {match.games.map(
                                                            (game) => (
                                                                <td
                                                                    key={
                                                                        'game-' +
                                                                        game.pk
                                                                    }
                                                                    className={
                                                                        game.done &&
                                                                        game.home_player_score <
                                                                            game.away_player_score
                                                                            ? 'team2-winner'
                                                                            : ''
                                                                    }
                                                                    width="20%"
                                                                >
                                                                    {
                                                                        game.away_player_score
                                                                    }
                                                                </td>
                                                            )
                                                        )}
                                                        {match.games.length <
                                                            5 &&
                                                            [
                                                                ...Array(
                                                                    match_length -
                                                                        match
                                                                            .games
                                                                            .length
                                                                ),
                                                            ].map((e, i) => (
                                                                <td
                                                                    className="text-light"
                                                                    key={
                                                                        'game-filler-away-' +
                                                                        match.pk +
                                                                        '-' +
                                                                        i
                                                                    }
                                                                    width="20%"
                                                                >
                                                                    0
                                                                </td>
                                                            ))}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td
                                            className={
                                                match.done &&
                                                match.home_player_score <
                                                    match.away_player_score
                                                    ? 'team2-winner'
                                                    : ''
                                            }
                                        >
                                            {' '}
                                            {match.away_player_name}{' '}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Summary;
