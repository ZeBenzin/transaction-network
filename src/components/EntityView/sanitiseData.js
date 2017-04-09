import _ from 'lodash';

const sanitiseInputs = (transactions, links) => {
  const sanitisedInputs = [];
  _.each(transactions.inputs, (input, index) => {
    const node = {
      index,
      key: input.addresses[0],
      x: 500,
      y: 400,
      size: 5,
      weight: 3
    };
    sanitisedInputs.push(node);
    links.push({
      key: node.key,
      size: 3,
      source: node,
      value: input.output_value
    });
  });
  return sanitisedInputs;
};

const sanitiseOutputs = (transactions, links) => {
  const sanitisedOutputs = [];
  _.each(transactions.outputs, (output, index) => {
    sanitisedOutputs.push({
      index,
      key: output.addresses[0],
      x: 500,
      y: 400,
      size: 5,
      weight: 3
    });
  });
  _.each(links, (link) => {
    link.target = sanitisedOutputs[0];
    link.key = `${link.key},${sanitisedOutputs[0].key}`;
    link.size = (link.value / transactions.total * 100) / 10;
  });
  return sanitisedOutputs;
};

const sanitiseData = (transactions) => {
  const links = [];
  const sanitisedInputs = sanitiseInputs(transactions, links);
  const sanitisedOutputs = sanitiseOutputs(transactions, links);
  const nodes = [
    ...sanitisedInputs,
    ...sanitisedOutputs
  ];
  return {
    nodes,
    links
  };
};

export default sanitiseData;
