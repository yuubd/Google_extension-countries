import { getAllCoords } from "../../utils";

export type Coord = {
    lat: number,
    lng: number
}

export type Polyg0n = LngLat[];

export type LngLat = [number, number]

export class MapModel {
    public readonly polygons: Array<Coord[]>;
    public readonly center: Coord;
    public readonly isDark: boolean;

    constructor(countryIdx: number, rawCountryData: Object, isDark: boolean) {

        const polygons = getAllCoords(countryIdx);
        console.log(rawCountryData);
        const center: Coord = { lat: rawCountryData.latlng[0], lng: rawCountryData.latlng[1] };

        function _getCoordsForPolygons(polygons: Polyg0n[]): Array<Coord[]> {
            const coordsForPolygons = polygons.map((polygon: LngLat[]) => {
                const coordsForPolygon = polygon.map((lngLat: LngLat) => {
                    return { lat: lngLat[1], lng: lngLat[0] };
                });
                return coordsForPolygon;
            });
            return coordsForPolygons;
        }

        this.polygons = _getCoordsForPolygons(polygons);
        this.center = center;
        this.isDark = isDark;
    }
}