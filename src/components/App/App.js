import React, { Component } from 'react';
import { Provider } from 'react-redux';
import EntityView from 'src/components/EntityView/EntityView';
import Header from 'src/components/Header/Header';
import store from 'src/state/store/store';
import 'src/components/App/App.scss';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <EntityView />
        </div>
      </Provider>
    );
  }
}

export default App;
