// import { countries } from '../../data/json/countries.json';
import { features as countries } from './data/json/fullCountries.json';

export const NUMBER_OF_COUNTRIES = countries.length;

export function getRandomIndex(): number {
    return Math.floor(Math.random() * Math.floor(NUMBER_OF_COUNTRIES));
}

export function getCountryName(idx: number): string {
    return countries[idx].properties.ADMIN;
}

export function getAlphaCode(idx: number): string {
    return countries[idx].properties.ISO_A3.toLowerCase();
}

export function getAllCoords(idx: number) {
    console.log(idx);
    if (countries[idx].geometry.type === "Polygon") {
        return countries[idx].geometry.coordinates;
    } else if (countries[idx].geometry.type === "MultiPolygon") {
        return unseal(countries[idx].geometry.coordinates);
    }
}
function unseal(sealedCoords) {
    return sealedCoords.map((sealed) => {
        return sealed[0];
    });
}

export function formatNumber(num: number): string {
    const numStr = num.toString()
    if (numStr.length <= 3) { return numStr; }
    let res = "";
    let acc = 3;
    for (let i = numStr.length - 1; i > -1; i--) {
        if (acc === 0) {
            res = "," + res;
            acc = 2;
        } else { acc--; }

        res = numStr[i] + res;
    }
    return res;
}