import React, { Component } from 'react';
import d3 from "d3";
import functionPlot from 'function-plot';

window.d3 = d3;

functionPlot({
  title: 'y = x * x',
  target: '#quadratic-with-options',
  width: 580,
  height: 400,
  disableZoom: true,
  xAxis: {
    label: 'x - axis',
    domain: [-6, 6]
  },
  yAxis: {
    label: 'y - axis'
  },
  data: [{
    fn: 'sin(x)'
  }]
});


class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      equation: '',
      boundaries: ''
    };
  }
  
  handleEquationChange = (event) => {
    const equation = event.target.value;
    this.setState({
      equation: equation
    });
  };
  
  handleBoundariesChange = (event) => {
    const boundaries = event.target.value;
    this.setState({
      boundaries: boundaries
    });
  };
  
  handleHistorySave = () => {
  
  };
  
  render() {
    return(
      <div>
        <h2 className="App-title">Graph</h2>
        <input type="text" name="equation" className="question" onChange={this.handleEquationChange}/>
        <label htmlFor="equation"><span>Equation...</span></label>
        <input name="boundaries" className="question" onChange={this.handleBoundariesChange}/>
        <label htmlFor="boundaries"><span>Boundaries...</span></label>
        <button className="btn btn-outline-dark m-3" onClick={this.handleHistorySave}>Save in history</button>
      </div>
    );
  }
}

export default Graph;
