import React from 'react';
import 'src/components/Header/Header.scss';
import image from 'public/logo.png';

const Header = () => (
  <div className='header'>
    <div className='header__menu'>
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

export default Header;
