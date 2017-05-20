import React, { Component } from 'react';
import 'src/components/NavSideBar/NavSideBar.scss';

class NavSideBar extends Component {
  constructor () {
    super();
    this.state = {
      shouldAnimate: false
    };
  }

  componentWillReceiveProps ({ isVisible }) {
    if (this.props.isVisible !== isVisible) {
      this.setState({
        shouldAnimate: true
      });
    }
  }

  render () {
    let navClassName;
    if (this.state.shouldAnimate) {
      navClassName = this.props.isVisible ? 'slide-in' : 'slide-out';
    }
    return (
      <div className={`nav-side-bar ${navClassName}`}>
        <ul className='nav-side-bar__menu'>
          <li>Home</li>
          <li>My Ratings</li>
          <li>My Profile</li>
          <li>About</li>
        </ul>
      </div>
    );
  }
}

export default NavSideBar;
