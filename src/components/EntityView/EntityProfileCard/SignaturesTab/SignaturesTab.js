import React, { Component } from 'react';
import axios from 'axios';
import Graph from 'src/components/Graph/Graph';
import sanitiseData from 'src/components/EntityView/sanitiseData';
import 'src/components/EntityView/EntityProfileCard/SignaturesTab/SignaturesTab.scss';

class SignaturesTab extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nodesAndLinks: { nodes: [], links: [] }
    };
  }

  componentWillMount () {
    this.fetchEntity(this.props.entityId);
  }

  drawSignatureGraph (entities, signedEntityId) {
    const nodesAndLinks = sanitiseData(entities, signedEntityId);
    this.setState({ nodesAndLinks });
  }

  fetchEntity (entityId) {
    axios.get(`/api/entity/${entityId}/signatures`)
      .then(({ data }) => {
        this.drawSignatureGraph(data.entities, { entityId: data.signedEntity._id, entityName: data.signedEntity.name });
      })
      .catch();
  }

  render () {
    const { nodes, links } = this.state.nodesAndLinks;
    return nodes.length > 0 && links.length > 0 ? (<Graph nodes={nodes} links={links} height={300} width={400} />) : null;
  }
}

export default SignaturesTab;
