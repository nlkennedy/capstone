import React from 'react';
import {Link} from 'react-router';

class CreateMatchup extends React.Component {
    render() {
        return (
            <div class="container">

                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>New Team Matchup</h1>

                <form class="form-box">
                    <div class="matchup-row form-row">
                        <div class="col-sm-1">
                            <h4>#</h4>
                        </div>
                        <div class="col-sm-4">
                            <h4>Team A</h4>
                        </div>
                        <div class="col-sm-4">
                            <h4>Team B</h4>
                        </div>
                        <div class="col-sm-2">
                            <h4>Court</h4>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-sm-1 form-group">
                            <h4>1</h4>
                        </div>
                        <div class="col-sm-4 form-group">
                            <input type="text" class="form-control" placeholder="Player 1A" />
                        </div>
                        <div class="col-sm-4 form-group">
                            <input type="text" class="form-control" placeholder="Player 1B" />
                        </div>
                        <div class="col-sm-3 form-group">
                            <input type="text" class="form-control" placeholder="#" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-sm-1">
                            <h4>2</h4>
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" placeholder="Player 1A" />
                        </div>
                        <div class="col-sm-4">
                            <input type="text" class="form-control" placeholder="Player 1B" />
                        </div>
                        <div class="col-sm-3">
                            <input type="text" class="form-control" placeholder="#" />
                        </div>
                    </div>
                    <p>.</p><p>.</p><p>.</p>
                    <div class="form-row">
                        <div class="col-sm-1 form-group">
                            <h4>9</h4>
                        </div>
                        <div class="col-sm-4 form-group">
                            <input type="text" class="form-control" placeholder="Player 1A" />
                        </div>
                        <div class="col-sm-4 form-group">
                            <input type="text" class="form-control" placeholder="Player 1B" />
                        </div>
                        <div class="col-sm-3 form-group">
                            <input type="text" class="form-control" placeholder="#" />
                        </div>
                    </div>
                    <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                        <button type="submit" class="btn btn-secondary">Create</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default CreateMatchup;