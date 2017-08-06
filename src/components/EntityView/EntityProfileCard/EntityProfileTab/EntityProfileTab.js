import React, { Component } from 'react';
import axios from 'axios';
import 'src/components/EntityView/EntityProfileCard/EntityProfileTab/EntityProfileTab.scss';

class EntityProfileTab extends Component {
  constructor (props) {
    super(props);
    this.state = {
      entityFetched: false,
      entityId: props.entityId
    };
  }

  componentWillMount () {
    this.fetchEntity(this.props.entityId);
  }

  fetchEntity (entityId) {
    axios.get(`http://localhost:3001/api/entity/${entityId}`)
      .then(({data}) => {
        this.setState({
          entityFetched: true,
          entity: data
        });
      })
      .catch();
  }

  componentWillReceiveProps (nextProps) {
    this.fetchEntity(nextProps.entityId);
  }

  render () {
    if (this.state.entityFetched) {
      return (
        <div className='entity-profile-tab'>
          <div className='entity-profile__header'>
            <h1>{this.state.entity.name}</h1>
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
                {this.state.entity.resolvedAddresses.map((address, i) => (<li key={i}>{address}</li>))}
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
    } else {
      return null;
    }
  }
}

export default EntityProfileTab;
