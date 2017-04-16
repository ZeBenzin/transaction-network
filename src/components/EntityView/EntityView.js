import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from 'src/components/Graph/Graph';
import sanitiseData from 'src/components/EntityView/sanitiseData';
import EntitySearchInput from 'src/components/EntitySearchInput/EntitySearchInput';
import 'src/components/EntityView/EntityView.css';

const { array } = React.PropTypes;

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

  render () {
    const { nodes, links } = sanitiseData(this.props.transactions);
    const params = {
      nodes,
      links,
      width: this.state.width,
      height: this.state.height
    };

    return (
      <div className='entity-view'>
        <EntitySearchInput />
        <Graph {...params} />
      </div>
    );
  }
}

EntityView.propTypes = {
  transactions: array
};

const mapStateToProps = (state) => {
  return { transactions: state.transactions };
};

export default connect(mapStateToProps)(EntityView);
