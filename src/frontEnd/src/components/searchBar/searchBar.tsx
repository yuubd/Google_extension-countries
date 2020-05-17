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
    const [results, setResults]: [CountryId[], any] = useState([]);

    function setSearch(value: string): void {
        setSearchValue(value);
    }

    function searchForCountry(): void {
        let regex = new RegExp(searchValue.toLowerCase());
        const matched: CountryId[] = [];
        for (let country of countries) {
            if (regex.test(country.ADMIN.toLowerCase())) {
                matched.push({
                    name: country.ADMIN,
                    code: country.ISO_A3.toLowerCase()
                });
            }
        }
        setResults(matched);
    }

    function renderResults(): JSX.Element[] {
        let resultElements: JSX.Element[] = [];
        for (let result of results) {
            resultElements.push(<div key={result.code}>{ result.name }</div>);
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
                onChange={(event)=>setSearch(event.target.value)}
            />
            <div className="search-bar__button-bar">
                <i className="search link icon search-bar__buttons__icon" onClick={()=> searchForCountry()}></i>
                <i className="close link icon search-bar__buttons__icon" onClick={()=>props.searchOff()}></i>
            </div>
            <div>
                { renderResults() }
            </div>
        </div>
    );
}

export default SearchBar;
