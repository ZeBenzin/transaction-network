import React, { Component } from 'react';
import 'src/components/Header/Header.scss';
import image from 'public/logo.png';

class Header extends Component {
  constructor () {
    super();
    this.onHeaderMenuClick = this.onHeaderMenuClick.bind(this);
    this.state = {
      navIsActive: false
    };
  }

  onHeaderMenuClick () {
    this.setState({
      navIsActive: !this.state.navIsActive
    });
  }

  render () {
    return (
      <div className={`header${this.state.navIsActive ? ' is-active' : ''}`}>
        <div className='header__menu' onClick={this.onHeaderMenuClick}>
          <div className='header__menu-bar' />
          <div className='header__menu-bar' />
          <div className='header__menu-bar' />
        </div>
        <div className='header__links'>
          <a href='javascript:void(0);'>
            <i className='header__links-twitter fa' />
          </a>
          <a href='https://github.com/ZeBenzin/you-dont-node-me'>
            <i className='header__links-github fa' />
          </a>
        </div>
        <div className='header__logo'>
          <img src={image} />
        </div>
      </div>
    );
  }
}

export default Header;
