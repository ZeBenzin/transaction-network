import React, { Component } from 'react';
import $ from 'jquery';

class FetchDataButton extends Component {
  render () {
    return (
      <button onClick={this.getEntityData}>Get New Data</button>
    );
  }

  getEntityData () {
    $.get('http://localhost:3001/').done((data) => {
      console.log(data);
    }).fail((data) => {
      console.log(data);
      console.error('Request resulted in an error');
    });
  }
}

export default FetchDataButton;
