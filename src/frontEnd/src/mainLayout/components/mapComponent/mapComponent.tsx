import React from "react";

import { Map, Polygon, GoogleApiWrapper } from "google-maps-react";
import { MapModel } from "./mapModel";
import mapStyles from "./mapStyles";

import "./mapStyle.css";

export function MapComponent(props: { contryIdx: number, rawCountryData: Object, google: any }) {

    function _mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyles.dark
        });
    }
    console.log("props.rawCountryData in map component");
    console.log(props.rawCountryData);
    const mapModel = new MapModel(props.contryIdx, props.rawCountryData);
    return (
        <div className="map-component">
            <Map initialCenter={mapModel.center}
                center={mapModel.center}
                google={props.google}
                zoom={3}
                onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
            >
                {
                    mapModel.polygons.map((coordsForPolygon, idx) => {
                        return <Polygon
                            key={idx}
                            paths={coordsForPolygon}
                            strokeColor="#cfcfcf"
                            strokeOpacity={0.8}
                            strokeWeight={2}
                            fillColor="#cfcfcf"
                            fillOpacity={0.35}
                        />
                    })
                }
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDPqfgpCOeRSh817V36gHv1WfQclbWkVSg"
})(MapComponent);

