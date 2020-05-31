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
export type PropertyObj = {
    name: string
}
export type RawCountry = {
    name: string,
    flag: string,
    timezones: string[],
    region: string,
    capital: string,
    population: number,
    languages: PropertyObj[],
    currencies: PropertyObj[]
}

export class InfoPanelModel {
    public readonly rawInfoRows: RawInfoRow[];

    constructor(rawCountry: RawCountry) {

        function _getLabelFromString(value: string): string {
            return (value.length > 0) ? value : "-";
        }

        function _getLabelFromArray(propArr: PropertyObj[]): string {
            for (let index in propArr) {
                if (propArr[index].name.length > 0 && propArr[index].name[0] !== "[") {
                    return propArr[index].name;
                }
            }
            return "-";
        }

        function getCountryModel(rawCountry: RawCountry): RawInfoRow[] {
            const continent = _getLabelFromString(rawCountry.region);
            const population = formatNumber(rawCountry.population);
            const capital = _getLabelFromString(rawCountry.capital);
            const language = _getLabelFromArray(rawCountry.languages);
            const currency = _getLabelFromArray(rawCountry.currencies);

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