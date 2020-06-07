'use strict';
import { features as countries } from './fullCountries.json';

// temporary server 
export class TemporaryServer {
    constructor() {
        this.countries = countries;
        this.NUMBER_OF_COUNTRIES = this.countries.length;
    }
    // idx: country index
    // return Polyg0n[] = [number, number]
    getAllCoords(idx) {
        if (this.countries[idx].geometry.type === "Polygon") {
            return this.countries[idx].geometry.coordinates;
        } else if (this.countries[idx].geometry.type === "MultiPolygon") {
            return this.unseal(this.countries[idx].geometry.coordinates);
        }
    }

    unseal(sealedCoords) {
        return sealedCoords.map((sealed) => {
            return sealed[0];
        });
    }
}
