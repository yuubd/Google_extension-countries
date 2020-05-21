import { countries } from '../../data/json/countries.json';

const NUMBER_OF_COUNTRIES = 238;

export function getRandomIndex(): number {
    return Math.floor(Math.random() * Math.floor(NUMBER_OF_COUNTRIES));
}

export function getCountryName(idx: number): string {
    return countries[idx].ADMIN;
}

export function getAlphaCode(idx: number): string {
    return countries[idx].ISO_A3.toLowerCase();
}