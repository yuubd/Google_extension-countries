import React from 'react';

import { InfoRowComponent } from './infoRowComponent';
import { InfoRowModel } from '../../data/models';

import { RawCountry, InfoPanelModel } from './InfoPanelModel';
import './infoPanelStyle.css';

function InfoPanelComponent(props: { rawCountryData: RawCountry }) {
  const infoPanelModel = new InfoPanelModel(props.rawCountryData);


  return (
    <div className="info-panel">
      {
        infoPanelModel.rawInfoRows.map((row: InfoRowModel, idx: number) =>
          <InfoRowComponent key={idx} title={row.title} value={row.value} />
        )
      }
    </div>
  );
}

export default InfoPanelComponent;
