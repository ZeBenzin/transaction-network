import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { setTransactions } from '../../actions/actionCreators';

const { func } = React.PropTypes;

class FetchDataButton extends Component {
  render () {
    return (
      <button onClick={this.getEntityData.bind(this)}>Get New Data</button>
    );
  }

  handleTransactionsReceived (transactions) {
    this.props.dispatchSetTransactions(transactions);
  }

  getEntityData () {
    $.get('http://localhost:3001/')
      .done((data) => {
        this.handleTransactionsReceived(JSON.parse(data));
      })
      .fail((data) => {
        console.log(data);
        console.error('Request resulted in an error');
      });
  }
}

FetchDataButton.propTypes = {
  dispatchSetTransactions: func
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetTransactions (transactions) {
      dispatch(setTransactions(transactions));
    }
  };
};

export default connect(null, mapDispatchToProps)(FetchDataButton);
