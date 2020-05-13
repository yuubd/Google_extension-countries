import React, { useState, useEffect } from 'react';
import './infoPanel.css';
import { InfoRow } from './infoRow';
import { Grid, Container } from 'semantic-ui-react'

import { InfoRowModel } from '../../data/models';

function InfoPanel(props: { infoRows: Array<InfoRowModel> }) {
  // componentWillUnmount
  useEffect(() => {
      return () => {
          chrome.storage.local.set({alphaCode: undefined});
          alert('will unmount');
      }
  }, []);
  return (
    <div className="info-panel">
      {
        props.infoRows.map((row: InfoRowModel, idx: number) => 
            <InfoRow key={idx} title={row.title} value={row.value} /> 
        )
      }
    </div>
  );
}

export default InfoPanel;
