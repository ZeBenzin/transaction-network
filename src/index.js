import React from 'react';
import ReactDOM from 'react-dom';
import H1BGraph from './components/H1BGraph';
import './index.css';

ReactDOM.render(
  <H1BGraph url='data/h1bs.csv' />,
  document.querySelectorAll('.h1bgraph')[0]
);
