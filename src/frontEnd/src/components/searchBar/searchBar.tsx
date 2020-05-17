import React, { useState } from 'react';
import { countries } from '../../data/json/countries.json';
import './searchBar.css';

type CountryId = {
    name: string,
    code: string
}

function SearchBar(props: { initStr: string, size: number, searchOff: Function }) {

    // states
    const [searchValue, setSearchValue]: [string, any] = useState(props.initStr);
    const [results, setResults]: [CountryId[], any] = useState(searchForCountry(props.initStr));

    function onUpdateSearch(input: string): void {
        setSearchValue(input);
        setResults(searchForCountry(input));
    }

    function searchForCountry(search: string): CountryId[] {
        let regex = new RegExp(search.toLowerCase());
        const matched: CountryId[] = [];
        for (let country of countries) {
            if (regex.test(country.ADMIN.toLowerCase())) {
                matched.push({
                    name: country.ADMIN,
                    code: country.ISO_A3.toLowerCase()
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
                    <div key={ result.code } className="search-bar__results__result">
                        <div className="search-bar__results__name">{ result.name }</div>
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
                style={{fontSize: (props.size*0.9)+"px"}}
                placeholder="Search"
                value={searchValue}
                onChange={(event)=>onUpdateSearch(event.target.value)}
            />
            <div className="search-bar__button-bar">
                <i className="close link icon search-bar__icon" onClick={()=>props.searchOff()}></i>
            </div>
            <div className="search-bar__results">
                { renderResults() }
            </div>
        </div>
    );
}

export default SearchBar;
