import React from 'react';

class GameScoreboard extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginBottom: '5%'}}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoreboard</h1>

                <div className="container shaded-gray">
                    <div className="row">
                        <div className="col-4">
                            <h4 className="text-left">TEAM 1</h4>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h4 className="text-right">TEAM 2</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 shaded-dark-gray">
                            <h5 className="text-left text-light">
                                First Name Last Name
                            </h5>
                        </div>
                        <div className="col-2 align-self-center">
                            <h1>2 | 1</h1>
                        </div>
                        <div className="col-5 shaded-dark-gray">
                            <h5 className="text-right text-light">
                                First Name Last Name
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 text-right scoreboard">
                            4
                        </div>
                        <div className="col-2">
                        </div>
                        <div className="col-5 text-left scoreboard">
                            5
                        </div>
                    </div>
                   
                </div>
            </div>
        )
    }
}

export default GameScoreboard;