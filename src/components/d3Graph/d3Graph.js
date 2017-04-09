const enterNode = (selection) => {
  selection.classed('node', true);

  selection.append('circle')
    .attr('r', d => d.size);

  selection.append('text')
    .attr('x', d => d.size + 5)
    .attr('dy', '.35em');
};

const updateNode = (selection) => {
  selection.attr('transform', d => `translate(${d.x}, ${d.y})`);
};

const enterLink = (selection) => {
  selection.classed('link', true)
    .attr('stroke-width', d => d.size);
};

const updateLink = (selection) => {
  selection.attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y);
};

const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode);
  selection.selectAll('.link')
    .call(updateLink);
};

module.exports = {
  enterNode,
  updateNode,
  enterLink,
  updateLink,
  updateGraph
};
