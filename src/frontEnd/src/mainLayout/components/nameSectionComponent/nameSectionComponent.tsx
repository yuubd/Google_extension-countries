import React from "react";

import { SearchBarComponent } from "./searchBarComponent";
import { RawCountry } from "../infoPanelComponent/InfoPanelModel";

import { NameSectionModel } from "./nameSectionModel";
import "./nameSectionStyle.css";

type NameSectionProps = {
    countryIdx: number;
    rawCountryData: RawCountry;
    isSearching: boolean;
    setSearching: Function;
    changeCountry: Function;
}

function NameSectionComponent(props: NameSectionProps) {
    const nameSectionModel = new NameSectionModel(props.countryIdx, props.rawCountryData, props.isSearching);

    return (
        <div className="name-section">
            <div className="name-section__flag">
                <img className="flag-img" src={ nameSectionModel.flagUrl } />
            </div>
            <div className="name-section__text">
                { nameSectionModel.isSearching
                    ? <SearchBarComponent
                        initStr={ nameSectionModel.name }
                        size={ nameSectionModel.nameSize }
                        setSearching={() => props.setSearching(false)}
                        changeCountry={(index: number) => props.changeCountry(index)} />
                    : <div
                        className="country-name"
                        style={{ fontSize: nameSectionModel.nameSize + "px" }}
                        onClick={() => props.setSearching(true)}>
                        { nameSectionModel.name }
                    </div>
                }
                <div className="timezone">{ nameSectionModel.timezoneLabel }</div>
            </div>
        </div>
    );
}

export default NameSectionComponent;