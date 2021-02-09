import React, { useState } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from '../Header'
import Navbar from '../Navbar'
import Home from '../Home'
import About from '../About'
import CreateMatchup from '../CreateMatchup'
import Matchup from '../Matchup'
import GameScoring from '../GameScoring'
import GameScoreboard from '../GameScoreboard'
import Summary from '../Summary'
import NotFound from '../NotFound'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
          <div className="App">
            <Header />
            <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/create-matchup" component={CreateMatchup} />
                <Route exact path="/matchup/:team_matchup_id" component={Matchup} />
                <Route exact path="/game/:game_id/scoring" component={GameScoring} />
                <Route exact path="/game/:game_id/scoreboard" component={GameScoreboard} />
                <Route exact path="/matchup/:team_matchup_id/summary" component={Summary} />
                <Route component={NotFound} />
              </Switch>
          </div>
      </Router>
    );
  }
}

export default App;