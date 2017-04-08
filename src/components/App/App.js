import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import EntityView from '../EntityView/';
import FetchDataButton from '../FetchDataButton/FetchDataButton';
import EntitySearchInput from '../EntitySearchInput/EntitySearchInput';
import store from '../../store/store';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <EntitySearchInput />
          <EntityView url='data/h1bs.csv' />
          <FetchDataButton />
        </div>
      </Provider>
    );
  }
}

export default App;
