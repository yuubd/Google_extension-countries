import React from 'react';
import logo from '../../images/logo.svg';
import './app.css';

import { Map } from '../map'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Map/>
      </header>
    </div>
  );
}

export default App;
