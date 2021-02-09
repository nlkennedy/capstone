import React from 'react';
import {Link} from 'react-router';

class GameScoreboard extends React.Component {
    render() {
        return (
            <div class="container" style={{ marginBottom: '5%'}}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoreboard</h1>

                <div class="container shaded-gray">
                    <div class="row">
                        <div class="col-4">
                            <h4 class="text-left">TEAM 1</h4>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-4">
                            <h4 class="text-right">TEAM 2</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5 shaded-dark-gray">
                            <h5 class="text-left">
                                First Name Last Name
                            </h5>
                        </div>
                        <div class="col-2 align-self-center">
                            <h1>4 | 5</h1>
                        </div>
                        <div class="col-5 shaded-dark-gray">
                            <h5 class="text-right">
                                First Name Last Name
                            </h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5 text-right scoreboard">
                            4
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-5 text-left scoreboard">
                            5
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}

export default GameScoreboard;