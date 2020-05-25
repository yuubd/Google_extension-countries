import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './mainLayout.css';


import { InfoPanelComponent } from './components/infoPanelComponent'
import { MapComponent } from './components/mapComponent'
import { NameSection } from './components/nameSection'

import { Coord, Polyg0n } from './components/mapComponent/mapModel';
import { ButtonBar } from './components/buttonBar';
import { RawCountry } from './components/infoPanelComponent/InfoPanelModel';


import { getRandomIndex, getAlphaCode, getAllCoords, NUMBER_OF_COUNTRIES } from './utils';

export class MapModel {
    public readonly polygons: Polyg0n[];
    public readonly center: Coord;

    constructor(polygons: Polyg0n[] = [[[0, 0]]], center: Coord = { lat: 0, lng: 0 }) {
        if (!polygons.length) {
            this.polygons = polygons;
        } else if (!center) {
            this.center = center;
        }
        this.polygons = polygons;
        this.center = center;
    }
}

function MainLayout() {
    // states
    const [isSearching, setSearching]: [boolean, Function] = useState(false);
    const [isDarkTheme, setDarkTheme]: [boolean, Function] = useState(false);
    const [currIdx, setCurrIdx]: [number, any] = useState(0);
    const [rawCountryData, setRawCountryData]: [RawCountry, Function] = useState({});
    const [countryIdxs, setCountryIdxs]: [number[], Function] = useState([]);
    const [load, setLoad]: [boolean, Function] = useState(false);
    const [error, setError]: [string, Function] = useState('');

    // componentDidMount
    useEffect(() => {
        chrome.storage.local.get("countryIdx", async (data) => {
            let countryIdx = data.countryIdx;
            if (typeof data.countryIdx == "undefined") {
                countryIdx = getRandomIndex();
            }
            setCountryIdxs([countryIdx]);
            try {
                const res = await getRestCountry(getAlphaCode(countryIdx));
                setLoad(true);
                setRawCountryData(res.data);
            } catch (err) {
                setError(err.message);
                setLoad(false);
            }
        })
    }, []);

    async function getRestCountry(alphaCode: string): Promise<JSON> {
        return axios.get(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
    }

    async function addNewCountry(index?: number): Promise<void> {
        const countryIdx = (index === undefined) ? getRandomIndex() : index;
        setCountryIdxs([...countryIdxs, countryIdx]);
        try {
            const res = await getRestCountry(getAlphaCode(countryIdx));

            setCurrIdx(currIdx + 1);
            setRawCountryData(res.data);
        } catch (err) {
            setError(err.message);
            setLoad(false);
        }
    }

    // used in the template
    async function setPrevCountry(idx: number): Promise<void> {
        setSearching(false);
        if (idx > 0) {
            const newIdx = idx - 1;
            const contryIdx = countryIdxs[newIdx]
            const res = await getRestCountry(getAlphaCode(contryIdx));
            setRawCountryData(res.data);
            setCurrIdx(newIdx);
        }
    }

    async function setNextCountry(idx: number, countryIdxs: number[]): Promise<void> {
        try {
            setSearching(false);
            // Have traversed all countries
            if (idx + 1 == NUMBER_OF_COUNTRIES) {
                setCurrIdx(0);
            } else {
                const newIdx = idx + 1;
                const countryIdx = _getCountryIdx(idx, countryIdxs, newIdx);
                const alphacode = getAlphaCode(countryIdx);
                const res = await getRestCountry(alphacode);
                setCurrIdx(newIdx);
                setRawCountryData(res.data);
            }
        } catch (err) {
            setError(err.message);
            setLoad(false);
        }
    }

    function _getCountryIdx(idx: number, countryIdxs: number[], newIdx: number): number {
        if (idx < countryIdxs.length - 1) {
            return countryIdxs[newIdx];
        } else {
            const countryIdx = getRandomIndex();
            setCountryIdxs([...countryIdxs, countryIdx]);
            return countryIdx;
        }
    }

    async function setNextCountryAndReplace(countryIdx: number): Promise<void> {
        setSearching(false);
        await addNewCountry(countryIdx);
        //countryModelArr.splice(currIdx + 1); // remove elements after it
    }

    // main
    if (!load || !Object.keys(rawCountryData).length)
        return <div> Loading... </div>;

    else if (error)
        return <li> {error.message} </li>;

    else {
        return (
            <div className={`main-layout ${isDarkTheme ? "theme-dark" : ""}`}>
                {isDarkTheme && <img className="background-image" src={require("./assets/darkmode-bg.png")} alt="background" />}
                {/* <NameSection
                    name={countryModelArr[currIdx].name}
                    timezone={countryModelArr[currIdx].timezone}
                    flagUrl={countryModelArr[currIdx].flagUrl}
                    isSearching={isSearching}
                    setSearching={(state: boolean) => setSearching(state)}
                    changeCountry={(index: number) => setNextCountryAndReplace(index)}
                /> */}
                <MapComponent contryIdx={countryIdxs[currIdx]} rawCountryData={rawCountryData} />
                <InfoPanelComponent rawCountryData={rawCountryData} />
                <ButtonBar
                    onClickPrev={() => setPrevCountry(currIdx)}
                    onClickNext={() => setNextCountry(currIdx, countryIdxs)}
                    isDarkTheme={isDarkTheme}
                    setDarkTheme={(isDark: boolean) => setDarkTheme(isDark)}
                />
            </div>
        );
    }
}

export default MainLayout;
