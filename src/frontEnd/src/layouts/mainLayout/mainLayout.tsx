import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './mainLayout.css';

import { SettingsComponent } from '../settingsComponent';
import { InfoPanel } from '../../components/infoPanel'
import { MapComponent } from '../../components/mapComponent'
import { NameSection } from '../../components/nameSection'

import { InfoRowModel } from '../../data/models';
import { MapModel, Coord } from '../../components/mapComponent/mapComponent';
import { ButtonBar } from '../../components/buttonBar';
import { CountryModel } from '../../data/models/CountryModel';


import { getRandomIndex, getCountryName, getAlphaCode, getAllCoords, NUMBER_OF_COUNTRIES } from './utils';


type RawCountry = {
    name: string,
    flag: string,
    timezones: string[],
    region: string,
    capital: string,
    population: number,
    languages: Name[],
    currencies: Name[]
}
type Name = {
    name: string
}


const ROW_TYPES = {
    continent: "Continent",
    capital: "Capital City",
    pupolation: "Population",
    language: "Language",
    currency: "Currency"
}

function MainLayout() {
    // states
    const [currIdx, setCurrIdx]: [number, any] = useState(0);
    const [countryModelArr, setCountryModelArr]: [CountryModel[], Function] = useState([new CountryModel()]);
    const [currPage, setCurrPage]: [string, Function] = useState(""); // ""(main), "settings"
    const [isSearching, setSearching]: [boolean, Function] = useState(false);
    const [isDarkTheme, setDarkTheme]: [boolean, Function] = useState(false);
    const [load, setLoad]: [boolean, Function] = useState(false);
    const [error, setError]: [string, Function] = useState('');
    const [mapModels, setMapModel]: [MapModel[], Function] = useState([new MapModel()]);

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
            try {
                const res = await getRestCountry(getAlphaCode(countryIdx));

                const countryModel = getCountryModel(countryIdx, res.data, 0);
                setCountryModelArr([countryModel]);

                const center: Coord = { lat: res.data.latlng[0], lng: res.data.latlng[1] }
                const mapModel = new MapModel(getAllCoords(countryIdx), center)
                setMapModel([mapModel]);
                setLoad(true);
            } catch (err) {
                setError(err.message);
                setLoad(false);
            }
        })
    }, []);

    async function getRestCountry(alphaCode: string): Promise<JSON> {
        return axios.get(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
    }

    // Below two functions are deserialing JSON to data models
    function getCountryModel(countryIdx: number, rawCountry: RawCountry, currentIdx: number): CountryModel {
        const name: string = getCountryName(countryIdx);
        const flagUrl: string = rawCountry.flag;
        const timezone: string = rawCountry.timezones[0]; // use index 0 (for now)

        const continent = rawCountry.region;
        const population = formatNumber(rawCountry.population);
        const capital = rawCountry.capital;
        const language = rawCountry.languages[0].name;
        const currency = rawCountry.currencies[0].name;

        const infoForRows = [
            { name: ROW_TYPES.continent, value: continent },
            { name: ROW_TYPES.capital, value: capital },
            { name: ROW_TYPES.pupolation, value: population },
            { name: ROW_TYPES.language, value: language },
            { name: ROW_TYPES.currency, value: currency }
        ]
        const rows: Array<InfoRowModel> = getInfoRows(infoForRows, currentIdx);

        return new CountryModel(name, flagUrl, timezone, rows);
    }

    function getInfoRows(infos: Array<Object>, currentIdx: number) {
        return infos.map(rowInfo => {
            return new InfoRowModel(rowInfo.name, rowInfo.value)
        });
    }


    function formatNumber(num: number): string {
        const numStr = num.toString()
        if (numStr.length <= 3) { return numStr; }
        let res = "";
        let acc = 3;
        for (let i = numStr.length - 1; i > -1; i--) {
            if (acc === 0) {
                res = "," + res;
                acc = 2;
            } else { acc--; }

            res = numStr[i] + res;
        }
        return res;
    }

    async function addNewCountry(index?: number): Promise<void> {
        const countryIdx = (index === undefined) ? getRandomIndex() : index;
        try {
            const res = await getRestCountry(getAlphaCode(countryIdx));
            const countryModel = getCountryModel(countryIdx, res.data, currIdx);
            setCountryModelArr([...countryModelArr, countryModel]);

            const center: Coord = { lat: res.data.latlng[0], lng: res.data.latlng[1] };
            const mapModel = new MapModel(await getAllCoords(countryIdx), center);
            setMapModel([...mapModels, mapModel]);
            setCurrIdx(currIdx + 1);
        } catch (err) {
            setError(err.message);
            setLoad(false);
        }
    }

    // used in the template
    function setPrevCountry(): void {
        setSearching(false);
        if (currIdx > 0)
            setCurrIdx(currIdx - 1);
    }

    async function setNextCountry(currIdx: number): Promise<void> {
        try {
            setSearching(false);
            // Have traversed all countries
            if (currIdx + 1 == NUMBER_OF_COUNTRIES) {
                setCurrIdx(0);
                return;
            }
            if (currIdx === countryModelArr.length - 1) {
                await addNewCountry()
                return;
            }
        } catch (err) {
            setError(err.message);
            setLoad(false);
        }
        setCurrIdx(currIdx + 1);
    }

    async function setNextCountryAndReplace(countryIdx: number): Promise<void> {
        setSearching(false);
        await addNewCountry(countryIdx);
        countryModelArr.splice(currIdx + 1); // remove elements after it
    }

    function renderMainLayout(): JSX.Element {
        return (
            <div className="main-layout">
                <NameSection
                    name={countryModelArr[currIdx].name}
                    timezone={countryModelArr[currIdx].timezone}
                    flagUrl={countryModelArr[currIdx].flagUrl}
                    isSearching={isSearching}
                    setSearching={(state: boolean) => setSearching(state)}
                    changeCountry={(index: number) => setNextCountryAndReplace(index)}
                />
                <MapComponent mapModel={mapModels[currIdx]} />
                <InfoPanel infoRows={countryModelArr[currIdx].infoRows} />
                <ButtonBar
                    onClickPrev={setPrevCountry}
                    onClickNext={() => setNextCountry(currIdx)}
                    currPage={currPage}
                    setCurrPage={(page: string) => setCurrPage(page)}
                />
            </div>
        );
    }

    function renderSettingsLayout(): JSX.Element {
        return (
            <SettingsComponent
                currPage={currPage}
                setCurrPage={(page: string) => setCurrPage(page)}
                isDarkTheme={isDarkTheme}
                setDarkTheme={(isDark: boolean) => setDarkTheme(isDark)}
            />
        )
    }

    function renderPageContent(): JSX.Element {
        if (currPage === "settings") {
            return renderSettingsLayout();
        } else {
            return renderMainLayout();
        }
    }

    // main
    if (!load)
        return <div> Loading... </div>; 
    
    else if (error)
        return <li> { error.message } </li>; 

    else 
        return (
            <div className={`main${isDarkTheme ? " theme-dark" : ""}`}>
                { isDarkTheme && <img className="background-image" src={require("../../assets/darkmode-bg.png")} alt="background" />}
                { renderPageContent() }
            </div>
        );
}

export default MainLayout;
