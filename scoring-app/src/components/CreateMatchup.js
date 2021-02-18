import React from 'react';

class CreateMatchup extends React.Component {
    render() {
        return (
            <div className="container">

                <h1 style={{ marginTop: '5%', marginBottom: '5%' }}>New Team Matchup</h1>

                <form className="form-box">
                    <div className="matchup-row form-row">
                        <div className="col-sm-1">
                            <h4>#</h4>
                        </div>
                        <div className="col-sm-4">                            
                            <div className="form-group">
                                {/* <h4><label for="exampleInputEmail1">Team A</label></h4> */}
                                <input type="text" className="form-control" placeholder="Team A" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-group">
                                {/* <h4><label for="exampleInputEmail1">Team A</label></h4> */}
                                <input type="text" className="form-control" placeholder="Team B" />
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <h4>Court</h4>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-1 form-group">
                            <h4>1</h4>
                        </div>
                        <div className="col-sm-4 form-group">
                            <input type="text" className="form-control" placeholder="Player 1A" />
                        </div>
                        <div className="col-sm-4 form-group">
                            <input type="text" className="form-control" placeholder="Player 1B" />
                        </div>
                        <div className="col-sm-3 form-group">
                            <input type="text" className="form-control" placeholder="#" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-sm-1">
                            <h4>2</h4>
                        </div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Player 2A" />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" placeholder="Player 2B" />
                        </div>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" placeholder="#" />
                        </div>
                    </div>
                    <p>.</p><p>.</p><p>.</p>
                    <div className="form-row">
                        <div className="col-sm-1 form-group">
                            <h4>9</h4>
                        </div>
                        <div className="col-sm-4 form-group">
                            <input type="text" className="form-control" placeholder="Player 3A" />
                        </div>
                        <div className="col-sm-4 form-group">
                            <input type="text" className="form-control" placeholder="Player 3B" />
                        </div>
                        <div className="col-sm-3 form-group">
                            <input type="text" className="form-control" placeholder="#" />
                        </div>
                    </div>
                    <div style={{ marginTop: '2%', marginBottom: '2%' }}>
                        <button type="submit" className="btn btn-secondary">Create</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default CreateMatchup;