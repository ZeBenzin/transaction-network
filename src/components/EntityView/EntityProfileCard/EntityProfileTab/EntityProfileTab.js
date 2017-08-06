import React, { Component } from 'react';
import 'src/components/EntityView/EntityProfileCard/EntityProfileTab/EntityProfileTab.scss';

class EntityProfileTab extends Component {
  render () {
    return (
      <div className='entity-profile-tab'>
        <div className='entity-profile__header'>
          <h1>Zeek</h1>
          <span className='entity-profile__header-trust' />
        </div>
        <div className='entity-profile__actions'>
          <p>Trusted via Bob</p>
        </div>
        <div className='entity-profile__stats'>
          <div className='entity-profile__stats-bars'>
            <ul className='entity-profile__stats-headers'>
              <li className='entity-profile__stats-trust-icon' />
              <li className='entity-profile__stats-honesty-icon' />
              <li className='entity-profile__stats-disputes-icon' />
            </ul>
            <div className='entity-profile__stats-colored-bars'>
              <div className='entity-profile__stats-bar trust' />
              <div className='entity-profile__stats-bar honesty' />
              <div className='entity-profile__stats-bar disputes' />
            </div>
          </div>
          <div className='entity-profile__stats-addresses'>
            <ul>
              <li>1L9JP1Z8zZkAoGz9...</li>
              <li>1MJxVMGYUEjHrZU...</li>
              <li>12TAB2Z1UF9GeJxX..</li>
              <li>1JFaz5QxDExZbFen...</li>
            </ul>
            <input
              className='entity-profile__resolve-address'
              type='button'
              value='Add Address'
            />
          </div>
        </div>
        <div className='entity-profile__actions'>
          <input
            className='entity-profile__actions-trust'
            type='button'
            value='Trust Entity'
          />
        </div>
      </div>
    );
  }
}

export default EntityProfileTab;
