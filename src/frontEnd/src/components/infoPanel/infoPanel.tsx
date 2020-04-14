import React from 'react';
import './infoPanel.css';
import { InfoRow } from './infoRow';

import { InfoRowModel } from '../../data/models';

function InfoPanel(props: { infoRows: Array<InfoRowModel> }) {
  return (
    <div>
      {
        props.infoRows.map((row: InfoRowModel) => 
          <InfoRow title={row.title} value={row.value} /> 
        )
      }
    </div>
  );
}

export default InfoPanel;
