import React, { Component } from 'react';
import { setVisibleTransactions } from 'src/state/actions/actionCreators';
import { connect } from 'react-redux';

import 'src/components/BlockChainIcon/BlockChainIcon.scss';

class BlockChainIcon extends Component {
  constructor (props) {
    super(props);
    this.onBlockChainIconClick = this.onBlockChainIconClick.bind(this);
  }

  onBlockChainIconClick () {
    this.props.dispatchSetVisibleTransactions(this.props.blockHeight);
  }

  render () {
    return (
      <div
        className={this.props.isCurrentTx ? 'blockchain-icon is-current-tx' : 'blockchain-icon'}
        onClick={this.onBlockChainIconClick}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetVisibleTransactions (blockHeight) {
      dispatch(setVisibleTransactions(blockHeight));
    }
  };
};

export default connect(null, mapDispatchToProps)(BlockChainIcon);
