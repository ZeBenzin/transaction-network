import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { setTransactions } from 'src/state/actions/actionCreators';
import EntityResultItem from 'src/components/EntityResultItem/EntityResultItem';
import 'src/components/EntitySearchInput/EntitySearchInput.scss';

class EntitySearchInput extends Component {
  constructor () {
    super();
    this.onAddressSearch = this.onAddressSearch.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onEntitySelected = this.onEntitySelected.bind(this);
    this.state = {
      isInitialized: false,
      isResultShown: false
    };
  }

  componentWillMount () {
    this.debouncedSearch = _.debounce(function () {
      axios.get(`http://localhost:3001/api/address/${this.state.address}`)
        .then(data => {
          this.handleTransactionsReceived(data.data);
        })
        .catch(data => {
          console.log(data);
          console.error('Request resulted in an error');
        });
    }, 500);
  }

  onEntitySelected () {
    this.props.showProfileCard();
    this.setState({
      isResultShown: false
    });
  }

  onInputChanged (e) {
    this.setState({
      isInitialized: true,
      isResultShown: true,
      address: e.target.value
    });
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

  render () {
    return (
      <div className={`entity-view__search-wrapper ${this.state.isInitialized ? 'initialized' : ''}`}>
        <div style={{ display: 'inline-block' }}>
          <div className='entity-view__search'>
            <input
              type='text'
              className='input__address-search-field'
              onInput={this.onInputChanged}
              onKeyDown={this.onKeyPress}
              autoFocus
              placeholder='Search...'
              spellCheck={false}
            />
            <input
              type='submit'
              value='&#xf002;'
              className='input__address-search-button'
              onClick={this.onAddressSearch}
            />
          </div>
          <div className={`entity-view__results-list ${this.state.isResultShown ? 'visible' : ''}`}>
            <div
              className='entity-view__result-item'
              onClick={this.onEntitySelected}
            >
              <EntityResultItem />
            </div>
            <div className='entity-view__result-item'>
              <EntityResultItem />
            </div>
            <div className='entity-view__result-item'>
              <EntityResultItem />
            </div>
            <div className='entity-view__result-item'>
              <EntityResultItem />
            </div>
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
