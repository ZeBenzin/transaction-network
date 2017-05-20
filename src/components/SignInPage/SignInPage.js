import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleSignInPage } from 'src/state/actions/actionCreators';
import 'src/components/SignInPage/SignInPage.scss';

class SignInPage extends Component {
  constructor () {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.onCredentialsSubmit = this.onCredentialsSubmit.bind(this);
    this.onUsernameChanged = this.onUsernameChanged.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
    this.onSignInExit = this.onSignInExit.bind(this);
  }

  onCredentialsSubmit () {
    // Prior to endpoint hookup, just close the modal
    this.setState({
      username: '',
      password: ''
    });
    this.props.dispatchCloseSignInPage();
  }

  onUsernameChanged (e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChanged (e) {
    this.setState({ password: e.target.value });
  }

  onSignInExit () {
    this.setState({
      username: '',
      password: ''
    });
    this.props.dispatchCloseSignInPage();
  }

  render () {
    return (
      <div className={`modal-sign-in ${this.props.isVisible ? 'visible' : ''}`}>
        <div className='modal-sign-in__content'>
          <input
            className='modal-sign-in__exit'
            type='submit'
            value='&#xf00d;'
            onClick={this.onSignInExit}
          />
          <h3 className='modal-sign-in__title' style={{marginTop: 0}}>Sign In</h3>
          <input
            className='modal-sign-in__username modal-sign-in__input-field'
            type='text'
            onInput={this.onUsernameChanged}
            placeholder='Username'
            spellCheck={false}
            autoFocus={this.props.isVisible}
            value={this.state.username}
          />
          <input
            className='modal-sign-in__password modal-sign-in__input-field'
            type='password'
            onInput={this.onPasswordChanged}
            placeholder='Password'
            value={this.state.password}
          />
          <Link to='/profile'>
            <input
              type='submit'
              value='Sign In'
              className='modal-sign-in__input-sign-in'
              onClick={this.onCredentialsSubmit}
            />
          </Link>
          <div className='modal-sign-in__help-section'>
            <span className='modal-sign-in__create-account' >Create an account</span>
            <span className='modal-sign-in__forgot-password' >Forgotten password?</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isVisible: state.signInPageVisible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchCloseSignInPage () {
      dispatch(toggleSignInPage(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
