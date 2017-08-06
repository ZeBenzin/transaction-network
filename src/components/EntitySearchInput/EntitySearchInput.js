import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { setTransactions } from 'src/state/actions/actionCreators';
import EntityResultItem from 'src/components/EntityResultItem/EntityResultItem';
import 'src/components/EntitySearchInput/EntitySearchInput.scss';

class EntitySearchInput extends Component {
  constructor () {
    super();
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.showEntityCard = this.showEntityCard.bind(this);
    this.state = {
      isInitialized: false,
      isResultShown: false,
      entitySuggestions: []
    };
  }

  componentWillMount () {
    this.debouncedSearch = _.debounce(function (searchTerm) {
      axios.post('http://localhost:3001/api/entity/suggest', { name: searchTerm })
        .then(({ data }) => {
          this.onEntitiesFetched(data);
        })
        .catch(data => {
          console.log(data);
          console.error('Request resulted in an error');
        });
    }, 500);
  }

  onInputChanged (e) {
    const searchTerms = e.target.value;
    this.debouncedSearch(searchTerms);
  }

  onKeyPress (e) {
    if (e.keyCode === 13) {
      this.onAddressSearch();
    }
  }

  showEntityCard (entityId) {
    this.props.showProfileCard(entityId);
  }

  onEntitiesFetched (entities) {
    this.setState({
      entitySuggestions: entities,
      isResultShown: true
    });
  }

  render () {
    return (
      <div className={`entity-view__search-wrapper ${this.state.isInitialized ? 'initialized' : ''}`}>
        <div style={{ display: 'inline-block' }}>
          <div className='entity-view__search'>
            <input
              type='text'
              className='input__address-search-field'
              onInput={this.onInputChanged}
              onKeyDown={this.onKeyPress}
              autoFocus
              placeholder='Search...'
              spellCheck={false}
            />
            <input
              type='submit'
              value='&#xf002;'
              className='input__address-search-button'
            />
          </div>
          <div className={`entity-view__results-list ${this.state.isResultShown ? 'visible' : ''}`}>
            {
              this.state.entitySuggestions.map(entity => {
                return (
                  <div
                    key={entity._id}
                    className='entity-view__result-item'
                  >
                    <EntityResultItem entity={entity} showEntityCard={this.showEntityCard} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetTransactions (transactions, visibleTransaction) {
      dispatch(setTransactions(transactions, visibleTransaction));
    }
  };
};

export default connect(null, mapDispatchToProps)(EntitySearchInput);
