import React, {Component} from 'react';
import Graph from '../Graph';
import '../Graph/style.css';

class EntityView extends Component {
  constructor () {
    super();
    this.state = {
      nodes: {},
      edges: {},
      width: 640,
      height: 480
    };
  }

  componentWillMount () {
    this.loadRawData();
  }

  loadRawData () {
    // Will eventually use JSON for this step
    const nodes = [
      { x: this.state.width / 3, y: this.state.height / 2 },
      { x: 2 * this.state.width / 3, y: this.state.height / 2 }
    ];
    const edges = [{ source: 0, target: 1 }];
    this.setState({nodes, edges});
    console.log(this.state);
  }

  render () {
    const params = {
      nodes: this.state.nodes,
      edges: this.state.edges,
      width: this.state.width,
      height: this.state.height
    };

    return (
      <div>
        <svg width={params.width} height={params.height}>
          <Graph {...params} />
        </svg>
      </div>
    );
  }
}

export default EntityView;
