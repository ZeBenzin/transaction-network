import React, {Component} from 'react';
import { connect } from 'react-redux';
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

  sanitizeData () {
    const graphData = this.props.transactions;
    return graphData;
    // Do magic here to extract nodes/edges from transactional data.
  }

  render () {
    // Get the nodes + edges from redux
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

const mapStateToProps = (state) => ({ transactions: state.transactions });

export default connect(mapStateToProps)(EntityView);
