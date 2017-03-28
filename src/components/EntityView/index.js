import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Graph from '../Graph';

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

  sanitizeData () {
    const graphData = this.props.transactions;
    const links = [];
    const sanitizedInputs = [];
    _.each(graphData.inputs, (input, index) => {
      const node = {
        index,
        key: input.addresses[0],
        x: 500,
        y: 400,
        size: 5,
        weight: 3
      };
      sanitizedInputs.push(node);
      links.push({
        key: node.key,
        size: 3,
        source: node
      });
    });

    const sanitizedOutputs = [];
    _.each(graphData.outputs, (output, index) => {
      sanitizedOutputs.push({
        index,
        key: output.addresses[0],
        x: 500,
        y: 400,
        size: 5,
        weight: 3
      });
    });
    _.each(links, (link) => {
      link.target = sanitizedOutputs[0];
      link.key = `${link.key},${sanitizedOutputs[0].key}`;
    });
    const nodes = [
      ...sanitizedInputs,
      ...sanitizedOutputs
    ];
    return {
      nodes,
      links
    };
  }

  render () {
    const { nodes, links } = this.sanitizeData();
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
