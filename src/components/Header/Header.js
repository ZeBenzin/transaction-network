import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavSideBar from 'src/components/NavSideBar/NavSideBar';
import { toggleSignInPage } from 'src/state/actions/actionCreators';
import 'src/components/Header/Header.scss';

class Header extends Component {
  constructor () {
    super();
    this.onHeaderMenuClick = this.onHeaderMenuClick.bind(this);
    this.onSignInClicked = this.onSignInClicked.bind(this);
    this.state = {
      navIsActive: false
    };
  }

  onHeaderMenuClick () {
    this.setState({
      navIsActive: !this.state.navIsActive
    });
  }

  onSignInClicked () {
    this.props.dispatchShowSignInPage();
  }

  render () {
    return (
      <div className={`header${this.state.navIsActive ? ' is-active' : ''}`}>
        <div
          className='header__menu'
          onClick={this.onHeaderMenuClick}>
          <div className='header__menu-bar' />
          <div className='header__menu-bar' />
          <div className='header__menu-bar' />
        </div>
        <Link to='/' style={{textDecoration: 'none'}}>
          <span className='header__logo'>
            Title XIV
          </span>
        </Link>
        <div className='header__links'>
          <span onClick={this.onSignInClicked}>
            <i className='header__links-sign-in fa' />
          </span>
          <a href='https://github.com/title14'>
            <i className='header__links-github fa' />
          </a>
        </div>
        <NavSideBar isVisible={this.state.navIsActive} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchShowSignInPage () {
      dispatch(toggleSignInPage(true));
    }
  };
};

export default connect(null, mapDispatchToProps)(Header);
