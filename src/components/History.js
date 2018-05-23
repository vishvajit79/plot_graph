import React from 'react';
import {getFromStorage } from '../utils/storage';
import Graph from "./Graph";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      clickedItem: ''
    }
  }
  
  componentDidMount() {
    this.updateData();
  }
  
  useItem = (e, item) => {
    this.setState({
      clickedItem: item
    })
  };
  
  updateData = async () => {
    const data  = await getFromStorage('93V7CR3ActSZVCwkr3Xv') ? getFromStorage('93V7CR3ActSZVCwkr3Xv') : [];
      this.setState({
        history: data
      });
  };
  render() {
    return(
        <div className="row">
        <div className="col-md-10">
          <Graph {...this.state}/>
        </div>
        <div className="col-md-2">
          <h2 className="App-title m-2">History</h2>
          <button type="button" className="btn btn-outline-dark m-2" onClick={this.updateData}>Update History</button>
          <div className="list-group">
            {this.state.history.map(user => {
              return <a key={user} onClick={(e) => this.useItem(e,user)} className="list-group-item list-group-item-action">{user}</a>
            })}
          </div>
        </div>
        </div>
    );
  }
}

export default History;
