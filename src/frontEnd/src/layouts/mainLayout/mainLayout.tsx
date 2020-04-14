import React from 'react';
import './mainLayout.css';

import { InfoPanel } from '../../components/infoPanel'
import { Map } from '../../components/map'
import { Flag } from '../../components/flag'
import { InfoRowModel } from '../../data/models';


const ROW_TYPES = [
  "Continent",
  "Capital City",
  "Population",
  "Language",
  "Currency"
]

function MainLayout() {

  const getTypeValue = (type: string): string => "test Value from " + type;

  const getRows = () => ROW_TYPES.map(type => new InfoRowModel(type, getTypeValue(type)));

  return (
    <div className="mainLayout">
      <Map country="colombia"/>
      <Flag countryCode="col"/>
      <InfoPanel infoRows = {getRows()} />
    </div>
  );
}

export default MainLayout;
