import React, { Component } from 'react';
import d3 from "d3";
import functionPlot from 'function-plot';
// import { setIntStorage, getFromStorage } from '../utils/storage';
import axios from "axios/index";

window.d3 = d3;

class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      equation: '',
      startBoundary: -6,
      endBoundary: 5,
      errorMessage: '',
      clickedEquation: '',
    };
  }
  
  /**
   * THIS FUNCTION WILL CALL PRINT WINDOWS FEATURE IN THE BROWSER
   */
  printCanvasOnly = () => {
    window.print();
  };
  
  /**
   * IF PROPS ARE RECEIVED FROM HISTORY THEN STATE IS UPDATED
   * @param nextProps
   */
  componentWillReceiveProps(nextProps){
      this.setState({
        equation: nextProps.clickedEquation
      });
  }
  
  /**
   * THIS FUNCTION WILL CALL THE D3.JS FUNCTION PLOT TO PLOT THE CANVAS
   */
  graphFunction = () => {
    if(this.state.equation) {
      try {
        functionPlot({
          target: '#quadratic-with-options',
          width: 350,
          height: 350,
          disableZoom: true,
          xAxis: {
            label: 'x - axis',
            domain: [this.state.startBoundary, this.state.endBoundary]
          },
          yAxis: {
            label: 'y - axis'
          },
          data: [{
            fn: this.state.equation
          }]
        });
      }
      catch (e) {
        this.setState({
          errorMessage: 'Invalid input values'
        })
      }
    }
  };
  
  /**
   * THIS METHOD IS CALLED WHEN INPUT BOX CHANGES FOR EQUATION
   * @param event
   */
  handleEquationChange = (event) => {
    const equation = event.target.value;
    if(equation) {
      this.setState({
        equation: equation,
        clickedEquation: equation,
        errorMessage: ''
      });
    }
  };
  
  /**
   * THIS METHOD IS CALLED WHEN INPUT BOX CHANGES FOR BOUNDARIES
   * @param event
   */
  handleBoundaryChange = (event) => {
    this.setState({
      startBoundary: -5,
      endBoundary: 5,
      errorMessage: ''
    });
    const boundaries = event.target.value;
    if(boundaries) {
      const newBoundary = boundaries.split(',');
      this.setState({
        startBoundary: parseInt(newBoundary[0], 10),
        endBoundary: parseInt(newBoundary[1], 10),
        errorMessage: ''
      });
    }
    else {
      if(this.state.startBoundary === '' || this.state.endBoundary === '' || this.state.startBoundary === null || this.state.endBoundary === null){
        this.setState({
          startBoundary: -5,
          endBoundary: 5
        });
      }
    }
  };
  
  /**
   * THIS METHOD IS CALLED WHEN FORM IS SUBMITTED AND IT WILL SAVE THE DATA AS A HISTORY USING AXIOS TO JSON FILE
   * @param event
   * @returns {Promise<void>}
   */
  handleSubmit = async (event) => {
    event.preventDefault();
    const equation = event.target.elements.equation.value;
    const boundaries = event.target.elements.boundaries.value;
    if(equation) {
      this.setState({
        equation: equation,
        errorMessage: ''
      });
    }
    this.setState({
      startBoundary: -5,
      endBoundary: 5,
      errorMessage: ''
    });
    if(boundaries) {
      const newBoundary = boundaries.split(',');
      this.setState({
        startBoundary: parseInt(newBoundary[0], 10),
        endBoundary: parseInt(newBoundary[1], 10),
        errorMessage: ''
      });
    }
    this.graphFunction();
    // let itemsArray  = getFromStorage('93V7CR3ActSZVCwkr3Xv') ? getFromStorage('93V7CR3ActSZVCwkr3Xv') : [];
    // if(!itemsArray.includes(event.target.elements.equation.value)) {
    //   itemsArray.push(event.target.elements.equation.value);
    //   setIntStorage('93V7CR3ActSZVCwkr3Xv', itemsArray);
    // }
      await axios.post('http://localhost:7000/history', {
        equation: this.state.equation,
        startBoundary: this.state.startBoundary,
        endBoundary: this.state.endBoundary
      }).then((res) => {
      }).catch(() => {
      });
    
  };
  
  render() {
    return(
      <div>
        <hr />
        <h2>Graph</h2>
        { this.state.errorMessage && <p className="text-danger">{ this.state.errorMessage }</p>}
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <input type="text" id="myInput" name="equation" className="textbox" onChange={this.handleEquationChange} value={this.state.equation} placeholder="Equation" required/>
            
          </div>
          <div className="field">
            <input type="text" placeholder="Boundary: -6,6" name="boundaries" className="textbox" onChange={this.handleBoundaryChange} />
            
          </div>
          <button type="submit" className="btn btn-outline-dark m-3">Draw</button>
          <button type="button" className="btn btn-outline-dark m-3" onClick={this.printCanvasOnly}>Print</button>
        </form>
      </div>
    );
  }
}

export default Graph;
