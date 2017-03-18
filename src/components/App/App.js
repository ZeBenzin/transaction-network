import React, { Component } from 'react';
import './App.css';
import EntityView from '../EntityView/';
import FetchDataButton from '../FetchDataButton/FetchDataButton';

class App extends Component {
  render () {
    return (
      <div>
        <EntityView url='data/h1bs.csv' />
        <FetchDataButton />
      </div>
    );
  }
}

export default App;
