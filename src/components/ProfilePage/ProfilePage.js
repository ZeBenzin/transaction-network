import React, { Component } from 'react';
import 'src/components/ProfilePage/ProfilePage.scss';

class ProfilePage extends Component {
  render () {
    return (
      <div className='profile__view'>
        <ul className='profile__view-tabs'>
          <li><a className='profile__view-tab-item' href=''>Profile</a></li>
          <li><a className='profile__view-tab-item' href=''>Addresses</a></li>
          <li><a className='profile__view-tab-item' href=''>Security</a></li>
        </ul>
      </div>
    );
  }
}

export default ProfilePage;
