import React, {Component} from 'react';
import { connect } from 'react-redux';
import Graph from 'src/components/Graph/Graph';
import sanitiseData from 'src/components/EntityView/sanitiseData';
import EntitySearchInput from 'src/components/EntitySearchInput/EntitySearchInput';
import BlockChainIcon from 'src/components/BlockChainIcon/BlockChainIcon';
import 'src/components/EntityView/EntityView.scss';

const { arrayOf, array, object } = React.PropTypes;

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
    const { nodes, links } = sanitiseData(this.props.visibleTx);
    const params = {
      nodes,
      links,
      width: this.state.width,
      height: this.state.height
    };

    return (
      <div className='entity-view'>
        <EntitySearchInput />
        <div className='entity-view__graph'>
          <Graph {...params} />
          <div className='entity-view__timeline'>
            {this.props.blocks.map((block, index) => {
              return <BlockChainIcon
                key={block}
                blockHeight={block}
                isCurrentTx={this.props.visibleTx[0].block_height === parseInt(block)}
              />;
            }, this)}
          </div>
        </div>
      </div>
    );
  }
}

EntityView.propTypes = {
  visibleTx: arrayOf(object),
  blocks: array
};

const mapStateToProps = (state) => {
  return {
    visibleTx: state.visibleTransaction,
    blocks: Object.keys(state.transactions)
  };
};

export default connect(mapStateToProps)(EntityView);
