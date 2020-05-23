import React, { useState } from 'react';
import { features as countries } from '../../data/json/fullCountries.json';
import './searchBar.css';

type CountryInfo = {
    index: number,
    name: string
}

function SearchBar(props: { initStr: string, size: number, setSearching: Function, changeCountry: Function }) {

    // states
    const [searchValue, setSearchValue]: [string, any] = useState(props.initStr);
    const [results, setResults]: [CountryInfo[], any] = useState(searchForCountry(props.initStr));

    function onUpdateSearch(input: string): void {
        setSearchValue(input);
        setResults(searchForCountry(input));
    }

    function searchForCountry(search: string): CountryInfo[] {
        let regex = new RegExp(search.toLowerCase());
        const matched: CountryInfo[] = [];
        for (let index in countries) {
            if (regex.test(countries[index].ADMIN.toLowerCase())) {
                matched.push({
                    index: +index,
                    name: countries[index].ADMIN
                });
            }
        }
        return matched;
    }

    function renderResults(): JSX.Element[] {
        let resultElements: JSX.Element[] = [];
        if ((results.length === 0)) {
            resultElements.push(
                <div key="none" className="search-bar__results__result no-results">No Search Results</div>
            );
        } else {
            for (let result of results) {
                resultElements.push(
                    <div key={result.index} className="search-bar__results__result" onClick={() => props.changeCountry(result.index)}>
                        <div className="search-bar__results__name">{result.name}</div>
                    </div>
                );
            }
        }
        return resultElements;
    }

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                style={{ fontSize: (props.size * 0.9) + "px" }}
                placeholder="Search"
                value={searchValue}
                onChange={(event) => onUpdateSearch(event.target.value)}
            />
            <div className="search-bar__button-bar">
                <i className="close link icon search-bar__icon" onClick={() => props.setSearching()}></i>
            </div>
            <div className="search-bar__results">
                {renderResults()}
            </div>
        </div>
    );
}

export default SearchBar;
