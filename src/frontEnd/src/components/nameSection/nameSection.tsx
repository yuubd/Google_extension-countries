import React, { useState } from 'react';
import './nameSection.css';

import { SearchBar } from '../searchBar';

function NameSection(props: {
    name: string,
    timezone: string,
    flagUrl: string,
    isSearching: boolean,
    setSearching: Function,
    changeCountry: Function
}) {

    // states
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
        if (props.isSearching) {
            return <SearchBar
                initStr={props.name}
                size={size}
                setSearching={()=>props.setSearching(false)}
                changeCountry={(index: number) => props.changeCountry(index)}
            />;
        } else {
            return (
                <div className="country-name" style={{fontSize: size+"px"}} onClick={()=>props.setSearching(true)}>
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
            <div className="name-section__flag">
                <img className="flag-img" src={props.flagUrl} />
            </div>
        </div>
    );
}

export default NameSection;