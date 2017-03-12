import React, { Component } from 'react';
import './App.css';
import EntityView from './components/EntityView/';

class App extends Component {
  render () {
    return (
      <EntityView url='data/h1bs.csv' />
    );
  }
}

export default App;
