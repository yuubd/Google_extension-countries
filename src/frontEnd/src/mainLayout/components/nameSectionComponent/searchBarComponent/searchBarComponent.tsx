import React, { useState } from "react";

import { NUMBER_OF_COUNTRIES, getCountryName } from "../../../utils";

import { SearchBarModel } from "./searchBarModel";
import "./searchBarStyle.css";

type CountryInfo = {
    index: number,
    name: string
}

function SearchBarComponent(props: { initStr: string, size: number, setSearching: Function, changeCountry: Function }) {
    const searchBarModel = new SearchBarModel(props.initStr, props.size);

    // states
    const [searchValue, setSearchValue]: [string, Function] = useState(searchBarModel.initStr);
    const [results, setResults]: [CountryInfo[], Function] = useState(searchForCountry(searchBarModel.initStr));

    function onSearchUpdated(input: string): void {
        setSearchValue(input);
        setResults(searchForCountry(input));
    }

    function searchForCountry(search: string): CountryInfo[] {
        let regex = new RegExp(search.toLowerCase());
        const matched: CountryInfo[] = [];
        for (let idx = 0; idx < NUMBER_OF_COUNTRIES; idx++) {
            const countryName = getCountryName(idx);
            if (regex.test(countryName.toLowerCase())) {
                matched.push({
                    index: +idx,
                    name: countryName
                });
            }
        }
        return matched;
    }

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                style={{ fontSize: searchBarModel.searchFontSize + "px" }}
                placeholder="Search"
                value={searchValue}
                onChange={(event) => onSearchUpdated(event.target.value)}
            />
            <div className="search-bar__button-bar">
                <i className="close link icon search-bar__icon" onClick={() => props.setSearching()}></i>
            </div>
            <div className="search-bar__results">
                {results.length === 0
                    ? <div key="none" className="search-bar__results__result no-results">No Search Results</div>
                    : results.map((result: CountryInfo, idx: number) =>
                        <div key={idx} className="search-bar__results__result" onClick={() => props.changeCountry(result.index)}>
                            <div className="search-bar__results__name">{result.name}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SearchBarComponent;