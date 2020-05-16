import React, { useState } from 'react';
import './nameSection.css';

function NameSection(props: { name: string, timezone: string, flagUrl: string }) {

    // states
    const [isSearching, setSearching]: [boolean, any] = useState(false);
    const [searchValue, setSearchValue]: [string, any] = useState("");

    function startSearch(): void {
        setSearching(true);
        setSearch(props.name);
    }

    function setSearch(value: string): void {
        setSearchValue(value);
    }

    function makeCountryNameElement(name: string): JSX.Element {
        let size: number = 20; // init with min size, in pixels
        const fontSizes: number[] = [32, 28, 24]; // in pixels
        const maxLengths: number[] = [12, 22, 32];
        for (let index in maxLengths) {
            if (name.length <= maxLengths[index]) {
                size = fontSizes[index];
                break;
            }
        }
        if (isSearching) {
            return (
                <input
                    className="country-name"
                    style={{fontSize: (size*0.9)+"px"}}
                    placeholder="Search"
                    value={searchValue}
                    onChange={(event)=>setSearch(event.target.value)}
                />
            );
        } else {
            return (
                <div className="country-name" style={{fontSize: size+"px"}} onClick={startSearch}>
                    { name }
                </div>
            );
        }
    }

    function makeTimezoneElement(timezone: string): JSX.Element {
        let timezoneLabel = timezone === "UTC" ? "" : timezone; // hide undefined timezones
        return <div className="timezone">{timezoneLabel}</div>;
    }

    return (
        <div className="name-section">
            <div className="name-section__text">
                { makeCountryNameElement(props.name) }
                { makeTimezoneElement(props.timezone) }
            </div>
            <div className="name-section__flag" onClick={() => setSearching(!isSearching)}>
                <img className="flag-img" src={props.flagUrl} />
            </div>
        </div>
    );
}

export default NameSection;
