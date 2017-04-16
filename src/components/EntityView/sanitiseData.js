import _ from 'lodash';

const getSourceNode = (nodes, sourceNodeKey, index) => {
  const sourceNodeIndex = _.findIndex(nodes, o => o.key === sourceNodeKey);
  if (sourceNodeIndex === -1) {
    nodes.push({
      index,
      key: sourceNodeKey,
      x: 500,
      y: 400,
      size: 5,
      weight: 3
    });
    return nodes.length - 1;
  }
  return sourceNodeIndex;
};

const getTargetNode = (nodes, targetNodeKey, index) => {
  const targetNodeIndex = _.findIndex(nodes, o => o.key === targetNodeKey);
  if (targetNodeIndex === -1) {
    nodes.push({
      index,
      key: targetNodeKey,
      x: 500,
      y: 400,
      size: 10,
      weight: 3
    });
    return nodes.length - 1;
  }
  return targetNodeIndex;
};

const sanitiseTransactions = (transactions) => {
  const links = [];
  const nodes = [];
  _.each(transactions, (tx, index) => {
    const sourceNodeIndex = getSourceNode(nodes, tx.inputs[0].prev_out.addr, index);
    const targetNodeIndex = getTargetNode(nodes, tx.outputs[0].addr, index);
    links.push({
      key: index,
      size: 3,
      source: nodes[sourceNodeIndex],
      target: nodes[targetNodeIndex],
      value: tx.total
    });
  });
  return {
    nodes,
    links
  };
};

const sanitiseData = (transactions) => {
  const { nodes, links } = sanitiseTransactions(transactions);
  return {
    nodes,
    links
  };
};

export default sanitiseData;
