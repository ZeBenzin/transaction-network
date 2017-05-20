import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import EntityView from 'src/components/EntityView/EntityView';
import ProfilePage from 'src/components/ProfilePage/ProfilePage';
import Header from 'src/components/Header/Header';
import SignInPage from 'src/components/SignInPage/SignInPage';
import store from 'src/state/store/store';
import 'src/components/App/App.scss';

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <SignInPage />
            <Header />
            <Route exact path='/' component={EntityView} />
            <Route exact path='/profile' component={ProfilePage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
