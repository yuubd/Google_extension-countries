import React from 'react';
import './nameSection.css';

function NameSection(props: { name: string, timezone: string, flagUrl: string }) {

    function makeCountryNameElement(name: string): JSX.Element {
        let size: string = "20px"; // init with min size
        const fontSizes: string[] = ["32px", "28px", "24px"];
        const maxLengths: number[] = [12, 22, 32];
        for (let index in maxLengths) {
            if (name.length <= maxLengths[index]) {
                size = fontSizes[index];
                break;
            }
        }
        return <div className="country-name" style={{fontSize: size}}>{ name }</div>;
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
