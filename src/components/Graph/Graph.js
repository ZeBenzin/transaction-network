import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';
import * as d3Graph from 'src/components/d3Graph/d3Graph.js';
import 'src/components/Graph/Graph.scss';

class Graph extends Component {
  constructor (props) {
    super();
    this.configureForce(props);
  }

  componentDidMount () {
    this.graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    this.force.on('tick', () => {
      this.graph.call(d3Graph.updateGraph);
    });
  }

  shouldComponentUpdate (nextProps) {
    this.graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    const d3Nodes = this.graph.selectAll('.node')
      .data(nextProps.nodes, node => node.key);
    d3Nodes.enter().append('g').call(d3Graph.enterNode);
    d3Nodes.exit().remove();
    d3Nodes.call(d3Graph.updateNode);

    const d3Links = this.graph.selectAll('.link')
      .data(nextProps.links, link => link.key);
    d3Links.enter().insert('line', '.node').call(d3Graph.enterLink);
    d3Links.exit().remove();
    d3Links.call(d3Graph.updateLink);

    this.force.nodes(nextProps.nodes)
      .links(nextProps.links);
    this.force.start();
    return false;
  }

  configureForce (props) {
    this.force = d3.layout.force()
    .charge(-300)
    .size([props.width, props.height])
    .linkDistance(125);
  }

  render () {
    return (
      <div>
        <div className='graph__container'>
          <svg width={this.props.width} height={this.props.height}>
            <g ref='graph' />
          </svg>
        </div>
      </div>
    );
  }
}

export default Graph;
