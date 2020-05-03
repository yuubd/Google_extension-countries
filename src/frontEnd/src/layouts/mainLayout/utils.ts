import { countries } from '../../data/json/countries.json';

const NUMBER_OF_COUNTRIES = 238;

function getRandomIndex(): number {
    return Math.floor(Math.random() * Math.floor(NUMBER_OF_COUNTRIES));
}

export function getRandomAlphaCode(): string {
    const idx = getRandomIndex();
    console.log("getRanDomAlphaCode, idx : " + idx); // console
    return countries[idx].ISO_A3.toLowerCase();
}