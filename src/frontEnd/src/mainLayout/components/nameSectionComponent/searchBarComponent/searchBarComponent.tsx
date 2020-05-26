import React, { useState } from "react";

import { SearchBarModel, CountryInfo } from "./searchBarModel";
import "./searchBarStyle.css";

function SearchBarComponent(props: { initStr: string, size: number, setSearching: Function, changeCountry: Function }) {
    const searchBarModel: SearchBarModel = new SearchBarModel(props.initStr, props.size, props.setSearching, props.changeCountry);

    // states
    const [searchValue, setSearchValue]: [string, Function] = useState(searchBarModel.initStr);
    const [results, setResults]: [CountryInfo[], Function] = useState(searchBarModel.searchForCountry(searchBarModel.initStr));

    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                style={{ fontSize: searchBarModel.searchFontSize + "px" }}
                placeholder="Search"
                value={ searchValue }
                onChange={(event) => searchBarModel.onSearchUpdated(event.target.value, setSearchValue, setResults)}
            />
            <div className="search-bar__button-bar">
                <i className="close link icon search-bar__icon" onClick={() => searchBarModel.setSearching()}></i>
            </div>
            <div className="search-bar__results">
                { results.length === 0
                    ? <div key="none" className="search-bar__results__result no-results">No Search Results</div>
                    : results.map((result: CountryInfo, idx: number) =>
                        <div key={ idx } className="search-bar__results__result" onClick={() => searchBarModel.changeCountry(result.index)}>
                            <div className="search-bar__results__name">{ result.name }</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default SearchBarComponent;