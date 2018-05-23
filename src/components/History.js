import React from 'react';
import {getFromStorage } from '../utils/storage';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }
  
  componentDidMount() {
    this.updateData();
  }
  
  useItem = () => {
  
  };
  
  updateData = async () => {
    const data  = await getFromStorage('93V7CR3ActSZVCwkr3Xv') ? getFromStorage('93V7CR3ActSZVCwkr3Xv') : [];
      this.setState({
        history: data
      });
    console.log(this.state.history);
  };
  render() {
    return(
      <div className="App-header m-2 p-2">
        <h2 className="App-title">History</h2>
        <button type="button" onClick={this.updateData}>Update History</button>
        {this.state.history.map(user => {
          return <li key={user} onClick={this.useItem}>{user}</li>
        })}
      </div>
    );
  }
}

export default History;
