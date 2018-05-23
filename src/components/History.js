import React from 'react';
// import {getFromStorage } from '../utils/storage';
import Graph from "./Graph";
import axios from 'axios';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      clickedEquation: '',
      clickedStartBoundary: '',
      clickedEndBoundary: ''
    }
  }
  
  componentDidMount() {
    this.updateData();
  }
  
  /**
   * THIS FUNCTION SENDS THE SELECTED VALUE FROM HISTORY PANEL TO THE GRAPH COMPONENT AND UPDATES THE TEXT INPUT WITHT THE ITEM.EQUATION
   * @param e
   * @param item
   */
  useItem = (e, item) => {
    this.setState({
      clickedEquation: item.equation,
      clickedStartBoundary: item.startBoundary,
      clickedEndBoundary: item.endBoundary
    })
  };
  
  /**
   * THIS FUNCTION UPDATES THE DATA FROM JSON FILE TO THE HISTORY PANEL. YOU CAN MANUALLY UPDATE BY CLICKING THE BUTTON
   * @returns {Promise<void>}
   */
  updateData = async () => {
    // const data  = await getFromStorage('93V7CR3ActSZVCwkr3Xv') ? getFromStorage('93V7CR3ActSZVCwkr3Xv') : [];
    //   this.setState({
    //     history: data
    //   });
    await axios.get('http://localhost:7000/history').then((res) => {
      this.setState({
        history: res.data
      });
      console.log(this.state.history);
    }).catch(() => {});
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
            {this.state.history.map((user,i) => {
              return <a key={i} onClick={(e) => this.useItem(e,user)} className="list-group-item list-group-item-action">{user.equation}</a>
            })}
          </div>
        </div>
        </div>
    );
  }
}

export default History;
