import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import EntityView from '../EntityView/';
import FetchDataButton from '../FetchDataButton/FetchDataButton';

class App extends Component {
  render () {
    return (
      <Provider>
        <div>
          <EntityView url='data/h1bs.csv' />
          <FetchDataButton />
        </div>
      </Provider>
    );
  }
}

export default App;
