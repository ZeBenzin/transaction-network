import React, { Component } from 'react';
import 'src/components/EntityResultItem/EntityResultItem.scss';

class EntityResultItem extends Component {
  constructor (props) {
    super(props);
    this.onEntitySelected = this.onEntitySelected.bind(this);
  }

  onEntitySelected () {
    this.props.onEntitySelected();
  }

  render () {
    return (
      <div>
        <div className='entity-result-item__left'>
          <p className='entity-result-item__left-name'>{this.props.entity.name}</p>
          {/* <div className='entity-result-item__left-status'>
            <ul className='entity-result-item__mini-stats'>
              <li className='trust' />
              <li className='honesty' />
              <li className='disputes' />
            </ul>
            <div className='entity-result-item__stats-colored-bars'>
              <div className='entity-result-item__stats-bar trust' />
              <div className='entity-result-item__stats-bar honesty' />
              <div className='entity-result-item__stats-bar disputes' />
            </div>
          </div> */}
        </div>
        <div className='entity-result-item__right'>
          <span className='entity-result-item__right-trust fa' />
        </div>
      </div>
    );
  }
}

export default EntityResultItem;
