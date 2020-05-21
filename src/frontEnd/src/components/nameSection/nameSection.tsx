import React from 'react';
import './nameSection.css';

import { SearchBar } from '../searchBar';

type NameSectionProps = {
    name: string,
    timezone: string,
    flagUrl: string,
    isSearching: boolean,
    setSearching: Function,
    changeCountry: Function
}

function NameSection(props: NameSectionProps) {

    function makeCountryNameElement(name: string): JSX.Element {
        let size: number = 20; // init with min size, in pixels
        const fontSizes: number[] = [32, 28, 24]; // in pixels
        const maxLengths: number[] = [13, 17, 21];
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
            <div className="name-section__flag">
                <img className="flag-img" src={props.flagUrl} />
            </div>
            <div className="name-section__text">
                { makeCountryNameElement(props.name) }
                { makeTimezoneElement(props.timezone) }
            </div>
        </div>
    );
}

export default NameSection;