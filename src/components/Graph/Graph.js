import React, { Component } from 'react';
import d3 from 'd3';

class Graph extends Component {
  constructor (props) {
    super();
    this.configureForce(props);
    this.updateD3(props);
  }

  componentWillReceive (newProps) {
    this.updateD3(newProps);
  }

  configureForce (props) {
    this.force = d3.layout.force()
      .size([props.width, props.height])
      .nodes(props.nodes)
      .links(props.edges)
      .linkDistance(props.width / 2);
  }

  makeLink (link, index) {
    const props = {
      x1: link.source.x,
      x2: link.target.x,
      y1: link.source.y,
      y2: link.target.y
    };
    return (
      <Link {...props} key={index} />
    );
  }

  makeNode (node, index) {
    const props = {
      width: this.props.width,
      x: node.x,
      y: node.y
    };
    return (
      <Node {...props} key={index} />
    );
  }

  updateD3 (props) {
    // this.force.on('end', this.solveMyProblems.bind(this));
    this.force.start();
  }

  solveMyProblems () {
    this.node.attr('r', this.props.width / 25)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    this.link.attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
  }

  render () {
    return (
      <g className='graph'>
        {this.props.edges.map(this.makeLink.bind(this))}
        {this.props.nodes.map(this.makeNode.bind(this))}
      </g>
    );
  }
}

class Node extends Component {
  render () {
    return (
      <circle className='node'
        r={this.props.width / 25}
        cx={this.props.x}
        cy={this.props.y} />
    );
  }
}

class Link extends Component {
  render () {
    return (
      <line className='link'
        x1={this.props.x1}
        x2={this.props.x2}
        y1={this.props.y1}
        y2={this.props.y2} />
    );
  }
}

export default Graph;
