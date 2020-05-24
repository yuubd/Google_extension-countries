import React, { useState, useEffect } from 'react';
import "./map.css";
import { Map, Polygon, GoogleApiWrapper } from "google-maps-react";

import mapStyles from "./mapStyles";

type Coord = {
    lat: number,
    lng: number
}

type Polyg0n = LngLat[];

type LngLat = [number, number]

export class MapModel {
    public readonly polygons: Polyg0n[];
    public readonly center: Coord;

    constructor(polygons: Polyg0n[] = [[[0, 0]]], center: Coord = { lat: 0, lng: 0 }) {
        if (!polygons.length) {
            this.polygons = polygons;
        } else if (!center) {
            this.center = center;
        }
        this.polygons = polygons;
        this.center = center;
    }
}

export function MapComponent(props: { mapModel: MapModel, google }) {

    function mapLoaded(mapProps, map) {
        map.setOptions({
            styles: mapStyles.dark
        });
    }

    function getCoordsForPolygons(polygons: Polyg0n[]): Array<Coord[]> {
        const coordsForPolygons = polygons.map((polygon: LngLat[]) => {
            const coordsForPolygon = polygon.map((lngLat: LngLat) => {
                return { lat: lngLat[1], lng: lngLat[0] };
            });
            return coordsForPolygon;
        });
        return coordsForPolygons;
    }

    return (
        <div className="map-component">
            <Map initialCenter={props.mapModel.center}
                center={props.mapModel.center}
                google={props.google}
                zoom={3}
                onReady={(mapProps, map) => mapLoaded(mapProps, map)}
            >
                {getCoordsForPolygons(props.mapModel.polygons).map((coordsForPolygon, idx) => {
                    return <Polygon
                        key={idx}
                        paths={coordsForPolygon}
                        strokeColor="#cfcfcf"
                        strokeOpacity={0.8}
                        strokeWeight={2}
                        fillColor="#cfcfcf"
                        fillOpacity={0.35} />
                })
                }
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDPqfgpCOeRSh817V36gHv1WfQclbWkVSg"
})(MapComponent);

