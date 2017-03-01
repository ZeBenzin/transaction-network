import React, { Component } from 'react';
import * as d3 from 'd3';

class Histogram extends Component {
  constructor (props) {
    super();
    this.histogram = d3.histogram(props.data);
    this.widthScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();

    this.updateD3(props);
  }

  componentWillReceive (newProps) {
    this.updateD3(newProps);
  }

  updateD3 (props) {
    this.histogram
      .value(props.value);

    const bars = this.histogram(props.data);
    const counts = bars.map(d => d.x1);

    this.widthScale
      .domain([d3.min(counts), d3.max(counts)])
      .range([9, props.width - props.axisMargin]);

    this.yScale
      .domain([0, d3.max(bars.map(d => d.x0 + d.x1))])
      .range([0, (props.height - props.topMargin) - props.bottomMargin]);
  }

  makeBar (bar) {
    const percent = bar.x0 / (this.props.data.length * 100);
    const props = {
      percent,
      x: this.props.axisMargin,
      y: this.yScale(bar.x0),
      width: this.widthScale(bar.x1),
      height: this.yScale(bar.x1),
      key: `histogram-bar-${bar.x0}-${bar.x1}`
    };
    return (
      <HistogramBar {...props} />
    );
  }

  render () {
    const translate = `translate(0, ${this.props.topMargin})`;
    const bars = this.histogram(this.props.data);
    return (
      <g className='histogram' transform={translate}>
        <g className='bars'>
          {bars.map(this.makeBar.bind(this))}
        </g>
      </g>
    );
  }
}

class HistogramBar extends Component {
  render () {
    const translate = `translate(${this.props.x}, ${this.props.y})`;
    let label = `${this.props.percent.toFixed(0)}%`;

    if (this.props.percent < 1) {
      label = `${this.props.percent.toFixed(2)}%`;
    }

    if (this.props.width < 20) {
      label = label.replace('%', '');
    }

    if (this.props.width < 10) {
      label = '';
    }

    return (
      <g transform={translate} className='bar'>
        <rect width={this.props.width}
          height={this.props.height}
          transform='translate(0, 1)' />
        <text textAnchor='end'
          x={this.props.width - 5}
          y={(this.props.height / 2) + 3}>
          {label}
        </text>
      </g>
    );
  }
}

export default Histogram;
