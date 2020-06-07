import { countries } from './data/json/countries.json';

export const NUMBER_OF_COUNTRIES = countries.length;

export function getRandomIndex(): number {
    return Math.floor(Math.random() * Math.floor(NUMBER_OF_COUNTRIES));
}

export function getCountryName(idx: number): string {
    return countries[idx].ADMIN;
}

export function getAlphaCode(idx: number): string {
    return countries[idx].ISO_A3.toLowerCase();
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
