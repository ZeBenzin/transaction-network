import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Graph from '../Graph';
//import './style.css';

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

  sanitiseData () {
    // TODO
    // Let the server handle this sanitisation
    const graphData = this.props.transactions;
    const links = [];
    const sanitisedInputs = [];
    _.each(graphData.inputs, (input, index) => {
      const node = {
        index,
        key: input.addresses[0],
        x: 500,
        y: 400,
        size: 5,
        weight: 3
      };
      sanitisedInputs.push(node);
      links.push({
        key: node.key,
        size: 3,
        source: node
      });
    });

    const sanitisedOutputs = [];
    _.each(graphData.outputs, (output, index) => {
      sanitisedOutputs.push({
        index,
        key: output.addresses[0],
        x: 500,
        y: 400,
        size: 5,
        weight: 3
      });
    });
    _.each(links, (link) => {
      link.target = sanitisedOutputs[0];
      link.key = `${link.key},${sanitisedOutputs[0].key}`;
    });
    const nodes = [
      ...sanitisedInputs,
      ...sanitisedOutputs
    ];
    return {
      nodes,
      links
    };
  }

  render () {
    const { nodes, links } = this.sanitiseData();
    const params = {
      nodes,
      links,
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
