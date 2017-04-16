import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'src/components/App/App.css';
import EntityView from 'src/components/EntityView/EntityView';
import store from 'src/state/store/store';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <EntityView />
      </Provider>
    );
  }
}

export default App;
