import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import $ from 'jquery';
import { setTransactions } from '../../actions/actionCreators';

class EntitySearchInput extends Component {
  render () {
    return (
      <input
        type='text'
        className='input__address-search'
        onChange={this.onAddressInput.bind(this)}
      />
    );
  }

  onAddressInput (e) {
    this.setState({ address: e.target.value });
    this.debouncedSearch();
  }

  handleTransactionsReceived (transactions) {
    this.props.dispatchSetTransactions(transactions);
  }

  componentWillMount () {
    this.debouncedSearch = _.debounce(function () {
      $.get(`http://localhost:3001/${this.state.address}`)
        .done(data => {
          this.handleTransactionsReceived(JSON.parse(data));
        })
        .fail(data => {
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
