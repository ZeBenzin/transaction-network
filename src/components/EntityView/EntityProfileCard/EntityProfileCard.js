import React, { Component } from 'react';
import axios from 'axios';
import EntityProfileTab from 'src/components/EntityView/EntityProfileCard/EntityProfileTab/EntityProfileTab';
import SignaturesTab from 'src/components/EntityView/EntityProfileCard/SignaturesTab/SignaturesTab';
import 'src/components/EntityView/EntityProfileCard/EntityProfileCard.scss';

class EntityProfileCard extends Component {
  constructor (props) {
    super(props);
    this.onTabSelected = this.onTabSelected.bind(this);
    this.state = {
      tabViews: {
        0: <EntityProfileTab />,
        1: <SignaturesTab />
      },
      shownTabKey: 0,
      entityFetched: false
    };
  }

  onTabSelected (e) {
    this.setState({
      shownTabKey: parseInt(e.target.dataset.id)
    });
  }

  componentWillMount () {
    this.fetchEntity();
  }

  fetchEntity () {
    axios.get(`http://localhost:3001/api/entity/${this.props.entityId}`)
      .then(({data}) => {
        this.setState({
          entityFetched: true,
          entity: data
        });
      })
      .catch();
  }

  render () {
    return (
      <div className={`entity-profile-card${this.props.isCardVisible && this.state.entityFetched ? ' active' : ''}`}>
        <div className='entity-profile-card__content'>
          <div className='entity-profile__view'>
            <ul className='entity-profile__view-tabs'>
              <li className={this.state.shownTabKey === 0 ? 'selected' : ''}><a
                className='entity-profile__view-tab-item'
                data-id='0'
                href='javascript:void(0)'
                onClick={this.onTabSelected}
              >Entity Profile</a></li>
              <li className={this.state.shownTabKey === 1 ? 'selected' : ''}><a
                className='entity-profile__view-tab-item'
                data-id='1'
                href='javascript:void(0)'
                onClick={this.onTabSelected}
              >Signatures</a></li>
            </ul>
            {this.state.tabViews[this.state.shownTabKey]}
          </div>
        </div>
      </div>
    );
  }
}

export default EntityProfileCard;
