import _ from 'lodash';

const getSignatureNode = (nodes, entity, index) => {
  nodes.push({
    index,
    key: entity._id,
    x: 500,
    y: 400,
    size: 10,
    weight: 3,
    label: entity.name
  });
};

const sanitiseSignatures = (entities, signedEntityId) => {
  const links = [];
  const nodes = [{
    index: 0,
    key: signedEntityId.entityId,
    x: 500,
    y: 400,
    size: 20,
    weight: 3,
    label: signedEntityId.entityName
  }];
  _.each(entities, (entity, index) => {
    getSignatureNode(nodes, entity, index + 1);
    links.push({
      key: index + 1,
      size: 6,
      source: nodes[index + 1],
      target: nodes[0],
      value: 100
    });
  });
  return {
    nodes,
    links
  };
};

const sanitiseData = (entities, signedEntityId) => {
  const { nodes, links } = sanitiseSignatures(entities, signedEntityId);
  return {
    nodes,
    links
  };
};

export default sanitiseData;
