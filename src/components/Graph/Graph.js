import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import d3 from 'd3';

var enterNode = (selection) => {
  selection.classed('node', true);

  selection.append('circle')
    .attr('r', (d) => d.size);

  selection.append('text')
    .attr('x', (d) => d.size + 5)
    .attr('dy', '.35em')
    .text((d) => d.key);
};

var updateNode = (selection) => {
  selection.attr('transform', (d) => 'translate(' + d.x + ',' + d.y + ')');
};

var enterLink = (selection) => {
  selection.classed('link', true)
    .attr('stroke-width', (d) => d.size);
};

var updateLink = (selection) => {
  selection.attr('x1', (d) => d.source.x)
    .attr('y1', (d) => d.source.y)
    .attr('x2', (d) => d.target.x)
    .attr('y2', (d) => d.target.y);
};

var updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
};

class Graph extends Component {
  constructor (props) {
    super();
    this.configureForce(props);
  }

  configureForce (props) {
    this.force = d3.layout.force()
      .charge(-300)
      .size([props.width, props.height])
      .linkDistance(50);
  }

  componentDidMount () {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
    this.force.on('tick', () => {
      this.d3Graph.call(updateGraph);
    });
  }

  shouldComponentUpdate (nextProps) {
    debugger;
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

    this.d3Graph.selectAll('.node')
      .data(nextProps.nodes, node => node.key)
      .enter()
      .append('g')
      .call(enterNode)
      .exit()
      .remove()
      .call(updateNode);

    this.d3Graph.selectAll('.link')
      .data(nextProps.links, link => link.key)
      .enter()
      .insert('line', '.node')
      .call(enterLink)
      .exit()
      .remove()
      .call(updateLink);

    this.force.nodes(nextProps.nodes)
      .links(nextProps.links);
    this.force.start();
    return false;
  }

  render () {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g ref='graph' />
      </svg>
    );
  }
}

export default Graph;
