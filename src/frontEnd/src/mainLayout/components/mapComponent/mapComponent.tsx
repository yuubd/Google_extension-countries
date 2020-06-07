import React, { useState, useEffect } from "react";

import { Map, Polygon, GoogleApiWrapper } from "google-maps-react";
import { Coord, MapModel } from "./mapModel";
import mapStyles from "./mapStyles";

import "./mapStyle.css";

export function MapComponent(props: { contryIdx: number, rawCountryData: Object, isDark: boolean, google: any }) {
    // TODO ED-29 remove mockserver
    const [coords, setCoords]: [Array<Coord[]>, Function] = useState([]);
    const [prevIdx, setPrevIdx]: [number, Function] = useState(0);
    useEffect(() => {
        chrome.runtime.onMessage.addListener(
            function (data) {
                if (data.type === "getAllCoordsRes") {
                    setCoords(data.coords);
                }
            }
        );
    }, []);

    // TODO ED-29 remove mockserver
    if (props.contryIdx != prevIdx) {
        setPrevIdx(props.contryIdx);
        chrome.runtime.sendMessage({
            type: "getAllCoords",
            countryIdx: props.contryIdx
        });
    }


    function _mapLoaded(mapProps, map, isDark) {
        const theme = isDark ? mapStyles.dark : mapStyles.light;
        map.setOptions({
            styles: theme
        });
    }
    function _getPolygonColor(isDark: boolean) {
        return isDark ? "#cfcfcf" : "#0080FF"
    }

    const mapModel = new MapModel(props.contryIdx, props.rawCountryData, props.isDark, coords);
    return (
        <div className="map-component">
            <Map initialCenter={mapModel.center}
                center={mapModel.center}
                google={props.google}
                zoom={2}
                onReady={(mapProps, map) => _mapLoaded(mapProps, map, mapModel.isDark)}
            >
                {
                    mapModel.polygons.map((coordsForPolygon, idx) => {
                        return <Polygon
                            key={idx}
                            paths={coordsForPolygon}
                            strokeColor={_getPolygonColor(mapModel.isDark)}
                            strokeOpacity={0.8}
                            strokeWeight={2}
                            fillColor={_getPolygonColor(mapModel.isDark)}
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

