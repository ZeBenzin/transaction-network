import React, { Component } from 'react';
import $ from 'jquery';

class FetchDataButton extends Component {
  render () {
    return (
      <button onClick={this.getEntityData}>Get New Data</button>
    );
  }

  getEntityData () {
    $.get('http://localhost:3001/', function (data) {
      debugger;
      console.log('data');
    }).done(() => {
      console.log('Good job!');
    }).fail((data) => {
      console.log('Oh dear');
      console.log(data);
    });
  }
}

export default FetchDataButton;
