import React from 'react';
import './wrapper.css';

import { InfoPanel } from '../infoPanel'
import { Map } from '../map'
import { Flag } from '../flag'

function Wrapper() {
  return (
    <div className="wrapper">
      <Flag/>
      <Map/>
      <InfoPanel/>
    </div>
  );
}

export default Wrapper;
