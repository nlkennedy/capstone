import React from 'react';
// import profile from '../images/person.jpg';
import plus from '../images/plus.png';

class GameScoring extends React.Component {
    render() {
        return (
            <div class="container" style={{ marginBottom: '5%'}}>
                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>Game Scoring</h1>

                <div class="container" style={{ paddingRight: '10%', paddingLeft: '10%' }}>
                    <div class="row">
                        <div class="col-4">
                            <h4 class="shaded-gray">TEAM 1</h4>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-4">
                            <h4 class="shaded-gray">TEAM 2</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <h5 class="shaded-gray">
                                <span>First Name</span>
                                <br></br>
                                <span>Last Name</span>
                            </h5>
                        </div>
                        <div class="col-4 align-self-center">
                            <h1>4 | 5</h1>
                        </div>
                        <div class="col-4">
                            <h5 class="shaded-gray">
                                <span>First Name</span>
                                <br></br>
                                <span>Last Name</span>
                            </h5>
                        </div>
                    </div>
                    {/* <div class="row">
                        <div class="col-4">
                            <img src={profile} class="img-fluid w-75" alt="" />
                        </div>
                        <div class="col-4 align-self-center">
                            <h1>4 | 5</h1>
                        </div>
                        <div class="col-4">
                            <img src={profile}  class="img-fluid w-75" alt="" />
                        </div>
                    </div> */}
                    <div class="row">
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="shaded-gray">
                                        <img src={plus} class="img-fluid w-75" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="game-button">L</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="game-button">R</h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-4 align-self-center">
                            <div class="container">
                                <h5>
                                    <div class="row">
                                        <div class="col-6 text-right"></div>
                                        <div class="col-6 text-left">1L</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-right">1R</div>
                                        <div class="col-6 text-left"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-right">2L</div>
                                        <div class="col-6 text-left"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-right"></div>
                                        <div class="col-6 text-left">2R</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-right"></div>
                                        <div class="col-6 text-left">3L</div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-right"></div>
                                        <div class="col-6 text-left">4R</div>
                                    </div>
                                </h5>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="shaded-gray">
                                        <img src={plus} class="img-fluid w-75" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="game-button">L</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="shaded-blue game-button">R</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4">
                            <h5 class="shaded-orange">Referee Call</h5>
                        </div>
                        <div class="col-4">
                            <h5 class="shaded-red game-button">Undo</h5>
                        </div>
                        <div class="col-4">
                            <h5 class="shaded-orange">Referee Call</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GameScoring;