import React, {Component} from 'react';
import Graph from '../Graph';
import { randomData } from './generateData.js';

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
    var newState = randomData(this.state.nodes, this.state.width, this.state.height);
    this.setState(newState);
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
