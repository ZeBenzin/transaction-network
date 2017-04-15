import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { setTransactions } from 'src/state/actions/actionCreators';
import './EntitySearchInput.css';

class EntitySearchInput extends Component {
  constructor () {
    super();
    this.onAddressSearch = this.onAddressSearch.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  render () {
    return (
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
    );
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

  handleTransactionsReceived (transactions) {
    this.props.dispatchSetTransactions(transactions);
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetTransactions (transactions) {
      dispatch(setTransactions(transactions));
    }
  };
};

export default connect(null, mapDispatchToProps)(EntitySearchInput);
