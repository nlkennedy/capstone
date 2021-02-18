import React from 'react';
// import profile from '../images/person.jpg';
import plus from '../images/plus.png';

class GameScoring extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginBottom: '5%'}}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoring</h1>

                <div className="container" style={{ paddingRight: '10%', paddingLeft: '10%' }}>
                    <div className="row">
                        <div className="col-4">
                            <h4 className="shaded-gray">TEAM 1</h4>
                        </div>
                        <div className="col-4"></div>
                        <div className="col-4">
                            <h4 className="shaded-gray">TEAM 2</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h5 className="shaded-gray">
                                <span>First Name</span>
                                <br></br>
                                <span>Last Name</span>
                            </h5>
                        </div>
                        <div className="col-4 align-self-center">
                            <h1>4 | 5</h1>
                        </div>
                        <div className="col-4">
                            <h5 className="shaded-gray">
                                <span>First Name</span>
                                <br></br>
                                <span>Last Name</span>
                            </h5>
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-4">
                            <img src={profile} className="img-fluid w-75" alt="" />
                        </div>
                        <div className="col-4 align-self-center">
                            <h1>4 | 5</h1>
                        </div>
                        <div className="col-4">
                            <img src={profile}  className="img-fluid w-75" alt="" />
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shaded-gray">
                                        <img src={plus} className="img-fluid w-75" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="game-button">L</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="game-button">R</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 align-self-center">
                            <div className="container">
                                <h5>
                                    <div className="row">
                                        <div className="col-6 text-right"></div>
                                        <div className="col-6 text-left">1L</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 text-right">1R</div>
                                        <div className="col-6 text-left"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 text-right">2L</div>
                                        <div className="col-6 text-left"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 text-right"></div>
                                        <div className="col-6 text-left">2R</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 text-right"></div>
                                        <div className="col-6 text-left">3L</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 text-right"></div>
                                        <div className="col-6 text-left">4R</div>
                                    </div>
                                </h5>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <div className="shaded-gray">
                                        <img src={plus} className="img-fluid w-75" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="game-button">L</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <h3 className="shaded-blue game-button">R</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <h5 className="shaded-orange">Referee Call</h5>
                        </div>
                        <div className="col-4">
                            <h5 className="shaded-red game-button">Undo</h5>
                        </div>
                        <div className="col-4">
                            <h5 className="shaded-orange">Referee Call</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameScoring;