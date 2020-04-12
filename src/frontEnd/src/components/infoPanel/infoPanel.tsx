import React from 'react';
import './infoPanel.css';
import { InfoRow } from './infoRow';

function InfoPanel() {
  return (
    <div>
      <InfoRow title="testTitle" value="tsetValue" />
    </div>
  );
}

export default InfoPanel;
