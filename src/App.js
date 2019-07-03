import React, { Component } from 'react';
import Clients from './components/screens/clients/index'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clients</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/clients-list"/>
                )}/>
                 <Route exact path='/clients-list' component={Clients} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
