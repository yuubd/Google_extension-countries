import React from 'react';
import './map.css';

import GoogleMapReact from 'google-map-react';

function Map(props: { country: string }) {
  const mapRequest = `https://www.google.com/maps/embed/v1/place?q=${props.country}&key=AIzaSyDPqfgpCOeRSh817V36gHv1WfQclbWkVSg`
  return (
    <div className="map">
      <iframe title="test" frameBorder="0" src={mapRequest} style={{width: "400px", height: "325px"}}/>
    </div>
  );
}

export default Map;
