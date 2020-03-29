import React from 'react';
import './map.css';

import GoogleMapReact from 'google-map-react';


const EXAMPLE_CENTER = {
  center: {
    lat: 59.95,
    lng: 30.33
  },
  zoom: 11  
};

function Map() {
  return (
    <div className="map">
      <iframe title="test" frameBorder="0" 
      src="https://www.google.com/maps/embed/v1/place?q=canada&key=KEY_GOES_HERE"/>
    </div>
  );
}

export default Map;
