import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { setTransactions } from 'src/state/actions/actionCreators';
import 'src/components/EntitySearchInput/EntitySearchInput.scss';

class EntitySearchInput extends Component {
  constructor () {
    super();
    this.onAddressSearch = this.onAddressSearch.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onInputChanged (e) {
    this.setState({ address: e.target.value });
  }

  onKeyPress (e) {
    if (e.keyCode === 13) {
      this.onAddressSearch();
    }
  }

  onAddressSearch () {
    this.debouncedSearch();
  }

  handleTransactionsReceived (txs) {
    const bucketedTxs = {};
    _.each(txs, tx => {
      if (!_.has(bucketedTxs, tx.block_height)) {
        bucketedTxs[tx.block_height] = [];
      }
      bucketedTxs[tx.block_height].push(tx);
    });
    const visibleTx = bucketedTxs[Object.keys(bucketedTxs)[0]];
    this.props.dispatchSetTransactions(bucketedTxs, visibleTx);
  }

  componentWillMount () {
    this.debouncedSearch = _.debounce(function () {
      axios.get(`http://localhost:3001/${this.state.address}`)
        .then(data => {
          this.handleTransactionsReceived(data.data);
        })
        .catch(data => {
          console.log(data);
          console.error('Request resulted in an error');
        });
    }, 500);
  }

  render () {
    return (
      <div className='entity-view__search-wrapper'>
        <div style={{ display: 'inline-block' }}>
          <div className='entity-view__search'>
            <input
              type='text'
              className='input__address-search-field'
              onInput={this.onInputChanged}
              onKeyDown={this.onKeyPress}
              autoFocus
              placeholder='Enter a wallet address'
              spellCheck={false}
            />
            <input
              type='submit'
              value='&#xf002;'
              className='input__address-search-button'
              onClick={this.onAddressSearch}
            />
          </div>
          <div className='entity-view__search--random'>
            <span>
              Select a random <a
                href='javascript:void(0);'
                className='entity-view__search--random-link'>address
              </a> ...
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetTransactions (transactions, visibleTransaction) {
      dispatch(setTransactions(transactions, visibleTransaction));
    }
  };
};

export default connect(null, mapDispatchToProps)(EntitySearchInput);
