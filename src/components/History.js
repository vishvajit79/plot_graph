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
      clickedEndBoundary: '',
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
    }).catch(() => {});
  };
  
  render() {
    return(
        <div className="row">
        <div className="col-md-12">
          <p>History <a className="btn btn-outline-secondary inline" onClick={this.updateData}>Update History</a></p>
          <div className="pointer" data-spy="scroll">
            {this.state.history.map((user,i) => {
                if (user.equation !== undefined) {
                  return <a className="m-1" key={i} onClick={(e) => this.useItem(e,user)}>{user.equation}</a>
                }
                return false;
            })}
          </div>
        </div>
          <div className="col-md-12">
            <Graph {...this.state}/>
          </div>
        </div>
    );
  }
}

export default History;
