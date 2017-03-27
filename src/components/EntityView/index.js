import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from '../Graph';
import { randomData } from './generateData.js';

const { object } = React.PropTypes;

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
    const newState = randomData({ ...this.state });
    this.setState(newState);
  }

  sanitizeData () {
    const graphData = this.props.transactions;
    return graphData;
    // Do magic here to extract nodes/edges from transactional data.
  }

  render () {
    // TODO
    // Get the nodes + edges from redux
    this.sanitizeData();
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

EntityView.propTypes = {
  transactions: object
};

const mapStateToProps = (state) => {
  return { transactions: state.transactions };
};

export default connect(mapStateToProps)(EntityView);
