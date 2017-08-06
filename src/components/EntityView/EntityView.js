import React, {Component} from 'react';
import { connect } from 'react-redux';
import EntitySearchInput from 'src/components/EntitySearchInput/EntitySearchInput';
import EntityProfileCard from 'src/components/EntityView/EntityProfileCard/EntityProfileCard';
import 'src/components/EntityView/EntityView.scss';

const { arrayOf, array, object } = React.PropTypes;

class EntityView extends Component {
  constructor () {
    super();
    this.state = {
      nodes: [],
      links: [],
      width: 960,
      height: 500,
      isCardVisible: false
    };
    this.showProfileCard = this.showProfileCard.bind(this);
  }

  showProfileCard (entityId) {
    this.setState({
      isCardVisible: true,
      entityId
    });
  }

  render () {
    return (
      <div className='entity-view'>
        <EntitySearchInput showProfileCard={this.showProfileCard} />
        {this.state.isCardVisible ? <EntityProfileCard isCardVisible={this.state.isCardVisible} entityId={this.state.entityId} /> : null }

      </div>
    );
  }
}

EntityView.propTypes = {
  visibleTx: arrayOf(object),
  blocks: array
};

const mapStateToProps = (state) => {
  return {
    visibleTx: state.visibleTransaction,
    blocks: Object.keys(state.transactions)
  };
};

export default connect(mapStateToProps)(EntityView);
