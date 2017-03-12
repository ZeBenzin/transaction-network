import React, {Component} from 'react';
import d3 from 'd3';
import _ from 'lodash';
import Graph from '../Graph';
import '../Graph/style.css';

class EntityView extends Component {
  constructor () {
    super();
    this.state = {
      nodes: [],
      links: [],
      width: 960,
      height: 500
    };
  }

  componentDidMount () {
    this.updateData();
  }

  updateData () {
    d3.csv(this.props.url, (error, data) => {
      const graph = { 'nodes': [], 'links': [] };
      data.forEach(function (d) {
        graph.nodes.push({ 'name': d.source, 'group': +d.groupsource });
        graph.nodes.push({ 'name': d.target, 'group': +d.grouptarget });

        graph.links.push({ 'source': d.source, 'target': d.target, 'value': +d.value });
      });

      var nodesmap = d3.nest()
        .key(function (d) { return d.name; })
        .rollup(function (d) { return { 'name': d[0].name, 'group': d[0].group }; })
        .map(graph.nodes);

      graph.nodes = d3.keys(d3.nest()
       .key(function (d) { return d.name; })
       .map(graph.nodes));

      graph.links.forEach(function (d, i) {
        graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
        graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
        graph.links[i].key = `${graph.links[i].source},${graph.links[i].target}`;
      });

      graph.nodes.forEach(function (d, i) { graph.nodes[i] = { 'name': nodesmap[d].name, 'group': nodesmap[d].group }; });
      _.each(graph.nodes, d => {
        d.x = 960 / 2 + _.random(-150, 150);
        d.y = 500 / 2 + _.random(-25, 25);
        d.size = _.random(4, 10);
        d.key = _.random(0, 30);
      });
      this.setState({nodes: graph.nodes, links: graph.links});
    });
  }

  render () {
    const params = {
      nodes: this.state.nodes,
      links: this.state.links,
      width: this.state.width,
      height: this.state.height
    };

    return (
      <div>
        <Graph {...params} />
      </div>
    );
  }
}

export default EntityView;
