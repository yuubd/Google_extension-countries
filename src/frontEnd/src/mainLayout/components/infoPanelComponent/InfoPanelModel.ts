import { formatNumber } from "../../utils";

export type RawInfoRow = {
    title: string,
    value: string
}

const ROW_TYPES = {
    continent: "Continent",
    capital: "Capital City",
    pupolation: "Population",
    language: "Language",
    currency: "Currency"
}
export type RawCountry = {
    name: string,
    flag: string,
    timezones: string[],
    region: string,
    capital: string,
    population: number,
    languages: string[],
    currencies: string[]
}

export class InfoPanelModel {
    public readonly rawInfoRows: RawInfoRow[];

    constructor(rawCountry: RawCountry) {
        function getCountryModel(rawCountry: RawCountry): RawInfoRow[] {
            const continent = rawCountry.region;
            const population = formatNumber(rawCountry.population);
            const capital = rawCountry.capital;
            const language = rawCountry.languages[0].name;
            const currency = rawCountry.currencies[0].name;

            const infoForRows = [
                { title: ROW_TYPES.continent, value: continent },
                { title: ROW_TYPES.capital, value: capital },
                { title: ROW_TYPES.pupolation, value: population },
                { title: ROW_TYPES.language, value: language },
                { title: ROW_TYPES.currency, value: currency }
            ]
            return infoForRows;
        }

        this.rawInfoRows = getCountryModel(rawCountry);
    }
}