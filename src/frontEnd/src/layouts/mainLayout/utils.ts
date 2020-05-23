// import { countries } from '../../data/json/countries.json';
import { features as countries } from '../../data/json/fullCountries.json';

const NUMBER_OF_COUNTRIES = 255;

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
    if (countries[idx].geometry.type === "Polygon") {
        return countries[idx].geometry.coordinates;
    } else if (countries[idx].geometry.type === "MultiPolygon") {
        return unseal(countries[idx].geometry.coordinates);
    }
}
function unseal(sealedCoords) {
    return sealedCoords.map((sealed) => {
        return sealed[0];
    })
}
