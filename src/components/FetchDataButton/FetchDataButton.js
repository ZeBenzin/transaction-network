import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { setTransactions } from '../../actions/actionCreators';

class FetchDataButton extends Component {
  render () {
    return (
      <button onClick={this.getEntityData}>Get New Data</button>
    );
  }

  handleTransactionsReceived (transactions) {
    this.props.dispatch(setTransactions(transactions));
  }

  getEntityData () {
    $.get('http://localhost:3001/').done((data) => {
      console.log(data);
      this.handleTransactionsReceived(data);
    }).fail((data) => {
      console.log(data);
      console.error('Request resulted in an error');
    });
  }
}

export default FetchDataButton;
