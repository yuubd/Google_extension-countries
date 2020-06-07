import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './mainLayout.css';

import { SettingsComponent } from './components/settingsComponent';
import { SettingButtonComponent } from './components/settingButtonComponent';
import { NameSectionComponent } from './components/nameSectionComponent';
import { MapComponent } from './components/mapComponent';
import { InfoPanelComponent } from './components/infoPanelComponent';
import { ButtonBarComponent } from './components/buttonBarComponent';

import { RawCountry } from './components/infoPanelComponent/InfoPanelModel';
import { getRandomIndex, getAlphaCode, NUMBER_OF_COUNTRIES } from './utils';

function MainLayout() {
    // states
    const [currIdx, setCurrIdx]: [number, Function] = useState(0);
    const [rawCountryData, setRawCountryData]: [RawCountry, Function] = useState({});
    const [countryIdxs, setCountryIdxs]: [number[], Function] = useState([]);
    const [isSettingsPage, setSettingsPage]: [boolean, Function] = useState(false);
    const [isSearching, setSearching]: [boolean, Function] = useState(false);
    const [isDarkTheme, setDarkTheme]: [boolean, Function] = useState(false);
    const [load, setLoad]: [boolean, Function] = useState(false);
    const [error, setError]: [string, Function] = useState('');

    // componentDidMount
    useEffect(() => {
        chrome.storage.local.get(["isDarkTheme", "countryIdx"], async (data) => {
            if (typeof data.isDarkTheme != "undefined") {
                setDarkTheme(data.isDarkTheme);
            }
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
            if (idx + 1 === NUMBER_OF_COUNTRIES) {
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
            <div className={`main-layout${isDarkTheme ? " theme-dark" : ""}`}>
                {isDarkTheme && <img className="background-image" src={require("./assets/darkmode-bg.png")} alt="background" />}
                {!isSearching &&
                    <SettingButtonComponent
                        isSettingsPage={isSettingsPage}
                        setSettingsPage={(isSettings: boolean) => setSettingsPage(isSettings)} />
                }
                {isSettingsPage
                    ? <SettingsComponent
                        setSettingsPage={(isSettings: boolean) => setSettingsPage(isSettings)}
                        isDarkTheme={isDarkTheme}
                        setDarkTheme={(isDark: boolean) => setDarkTheme(isDark)} />
                    : <div>
                        <NameSectionComponent
                            countryIdx={countryIdxs[currIdx]}
                            rawCountryData={rawCountryData}
                            isSearching={isSearching}
                            setSearching={(state: boolean) => setSearching(state)}
                            changeCountry={(index: number) => setNextCountryAndReplace(index)}
                        />
                        <MapComponent contryIdx={countryIdxs[currIdx]} rawCountryData={rawCountryData} isDark={isDarkTheme} />
                        <InfoPanelComponent rawCountryData={rawCountryData} />
                    </div>
                }
                <ButtonBarComponent
                    currIdx={currIdx}
                    isSettingsPage={isSettingsPage}
                    onClickPrev={() => setPrevCountry(currIdx)}
                    onClickNext={() => setNextCountry(currIdx, countryIdxs)}
                />
            </div>
        );
    }
}

export default MainLayout;
