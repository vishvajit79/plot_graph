import React, { Component } from 'react';

import History from './components/History';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title col-md-12">Welcome to Function Plot Application</h1>
        </header>
        <div className="m-5">
        <History/>
        </div>
      </div>
    );
  }
}

export default App;
