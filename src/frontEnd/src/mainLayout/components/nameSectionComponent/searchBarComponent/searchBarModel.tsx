import { features as countries } from "../../../data/json/fullCountries.json";

export type CountryInfo = {
    index: number,
    name: string
}

export class SearchBarModel {
    public readonly initStr: string;
    public readonly searchFontSize: number;
    public readonly setSearching: Function;
    public readonly onSearchUpdated: Function;
    public readonly searchForCountry: Function;
    public readonly changeCountry: Function;

    constructor(initStr: string, nameSize: number = 20, setSearching: Function, changeCountry: Function) {

        function _getSearchFontSize(nameSize: number): number {
            return nameSize * 0.9;
        }

        function _onSearchUpdated(input: string, setSearch: Function, setResults: Function): void {
            setSearch(input);
            setResults(_searchForCountry(input));
        }

        function _searchForCountry(search: string): CountryInfo[] {
            let regex = new RegExp(search.toLowerCase());
            const matched: CountryInfo[] = [];
            for (let index in countries) {
                if (regex.test(countries[index].properties.ADMIN.toLowerCase())) {
                    matched.push({
                        index: +index,
                        name: countries[index].properties.ADMIN
                    });
                }
            }
            return matched;
        }

        this.initStr = initStr;
        this.searchFontSize = _getSearchFontSize(nameSize);
        this.setSearching = setSearching;
        this.onSearchUpdated = _onSearchUpdated;
        this.searchForCountry = _searchForCountry;
        this.changeCountry = changeCountry;
    }
}