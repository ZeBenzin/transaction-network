import React, { Component } from 'react';
import EntityProfileTab from 'src/components/EntityView/EntityProfileCard/EntityProfileTab/EntityProfileTab';
import SignaturesTab from 'src/components/EntityView/EntityProfileCard/SignaturesTab/SignaturesTab';
import 'src/components/EntityView/EntityProfileCard/EntityProfileCard.scss';

class EntityProfileCard extends Component {
  constructor (props) {
    super(props);
    this.onTabSelected = this.onTabSelected.bind(this);
    this.state = {
      tabViews: {
        0: <EntityProfileTab entityId={this.props.entityId} />,
        1: <SignaturesTab entityId={this.props.entityId} />
      },
      shownTabKey: 0
    };
  }

  onTabSelected (e) {
    this.setState({
      shownTabKey: parseInt(e.target.dataset.id)
    });
  }

  render () {
    return (
      <div className={`entity-profile-card${this.props.isCardVisible ? ' active' : ''}`}>
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
            {this.state.shownTabKey === 0 ? <EntityProfileTab entityId={this.props.entityId} /> : <SignaturesTab entityId={this.props.entityId} />}
          </div>
        </div>
      </div>
    );
  }
}

export default EntityProfileCard;
