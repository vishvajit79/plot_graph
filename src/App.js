import React, { Component } from 'react';

import History from './components/History';
import Graph from './components/Graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Function Plot Application</h1>
        </header>
        <div className="row">
          <div className="col-md-10 col-12">
            <Graph/>
          </div>
          <div className="col-md-2 col-12">
            <History/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
