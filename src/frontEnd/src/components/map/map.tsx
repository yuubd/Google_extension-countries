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

function Map(props: { country: string }) {
  const mapRequest = `https://www.google.com/maps/embed/v1/place?q=${props.country}&key=AIzaSyDPqfgpCOeRSh817V36gHv1WfQclbWkVSg`
  return (
    <div className="map">
      <iframe title="test" frameBorder="0" 
      src={mapRequest}/>
    </div>
  );
}

export default Map;
