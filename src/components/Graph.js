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
  
  printCanvasOnly = () => {
    window.print();
  };
  
  componentWillReceiveProps(nextProps){
    if(this.state.clickedEquation !== nextProps.clickedEquation)
    {
      this.setState({
        clickedEquation: nextProps.clickedEquation
      });
    }
  }
  
  graphFunction = () => {
    if(this.state.equation) {
      try {
        functionPlot({
          target: '#quadratic-with-options',
          width: 400,
          height: 400,
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
  
  handleBoundaryChange = (event) => {
    const boundaries = event.target.value;
    if(boundaries) {
      const newBoundary = boundaries.split(',');
      this.setState({
        startBoundary: parseInt(newBoundary[0]),
        endBoundary: parseInt(newBoundary[1]),
        errorMessage: ''
      });
    }
  };
  
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
    if(boundaries) {
      const newBoundary = boundaries.split(',');
      this.setState({
        startBoundary: parseInt(newBoundary[0]),
        endBoundary: parseInt(newBoundary[1]),
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
        <h2>Graph</h2>
        <hr />
        { this.state.errorMessage && <p className="text-danger">{ this.state.errorMessage }</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="equation" className="question" onChange={this.handleEquationChange} value={this.state.clickedEquation} required/>
          <label htmlFor="equation"><span>Equation...sin(x)</span></label>
          <input type="text" name="boundaries" className="question" onChange={this.handleBoundaryChange} />
          <label htmlFor="boundaries"><span>Boundaries...[-6,6]</span></label>
          <button type="submit" className="btn btn-outline-dark m-3">Draw</button>
          <button type="button" className="btn btn-outline-dark m-3" onClick={this.printCanvasOnly}>Print</button>
        </form>
      </div>
    );
  }
}

export default Graph;
