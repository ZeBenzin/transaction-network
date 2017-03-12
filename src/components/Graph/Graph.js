import React, { Component } from 'react';
import d3 from 'd3';

class Graph extends Component {
  constructor (props) {
    super();
    this.configureForce(props);
  }

  configureForce (props) {
    this.force = d3.layout.force()
      .charge(-300)
      .size([props.width, props.height])
      .nodes(props.nodes)
      .links(props.links)
      .linkDistance(50)
      .start();
  }

  makeLink (link, index) {
    const props = {
      x1: link.source.x,
      x2: link.target.x,
      y1: link.source.y,
      y2: link.target.y,
      strokeWidth: link.size
    };
    return (
      <Link {...props} key={index} />
    );
  }

  componentWillMount () {
    this.force.on('tick', () => {
      this.forceUpdate();
    });
  }

  makeNode (node, index) {
    const props = {
      width: this.props.width,
      x: node.x,
      y: node.y,
      size: node.size,
      transform: `translate(${node.x}, ${node.y})`
    };
    return (
      <Node {...props} key={index} />
    );
  }

  render () {
    return (
      <g className='graph'>
        {this.props.links.map(this.makeLink.bind(this))}
        {this.props.nodes.map(this.makeNode.bind(this))}
      </g>
    );
  }
}

class Node extends Component {
  render () {
    return (
      <circle className='node'
        r={this.props.size}
        transform={this.props.transform} />
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
        y2={this.props.y2}
        strokeWidth={this.props.strokeWidth} />
    );
  }
}

export default Graph;
