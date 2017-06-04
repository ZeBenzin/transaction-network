import React, { Component } from 'react';
import 'src/components/EntityView/EntityProfileCard/SignaturesTab/SignaturesTab.scss';

class SignaturesTab extends Component {
  render () {
    return (
      <div className='signatures-view'>
        <table className='signatures-view__table'>
          <tbody>
            <tr>
              <td>Alice</td>
            </tr>
            <tr>
              <td>Bob</td>
            </tr>
            <tr>
              <td>Eve</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default SignaturesTab;
