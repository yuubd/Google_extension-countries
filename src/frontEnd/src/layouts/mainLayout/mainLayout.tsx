import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Container, Grid } from 'semantic-ui-react'
import './mainLayout.css';


import { InfoPanel } from '../../components/infoPanel'
import { MapComponent } from '../../components/mapComponent'
import { NameSection } from '../../components/nameSection'

import { InfoRowModel } from '../../data/models';
import { CountryModel } from '../../data/models/CountryModel';
import { MapModel, Coord } from '../../components/mapComponent/mapComponent';

import { getRandomIndex, getCountryName, getAlphaCode, getAllCoords } from './utils';


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
    const [currIdx, setCurrIdx]: [number, Function] = useState(0);
    const [countryModelArr, setCountryModelArr]: [CountryModel[], Function] = useState([new CountryModel()]);
    const [isSearching, setSearching]: [boolean, Function] = useState(false);
    const [load, setLoad]: [boolean, Function] = useState(false);
    const [error, setError]: [string, Function] = useState('');
    const [mapModels, setMapModel]: [MapModel[], Function] = useState([new MapModel()]);

    // componentDidMount
    useEffect(() => {
        chrome.storage.local.get("countryIdx", async (data) => {
            let countryIdx = data.countryIdx;
            if (typeof data.countryIdx == "undefined") {
                countryIdx = getRandomIndex();
            }
            try {
                const res = await getRestCountry(getAlphaCode(countryIdx));
                console.log("rawCountry"); // console
                console.log(res.data); // console

                const countryModel = getCountryModel(countryIdx, res.data);
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
    function getCountryModel(countryIdx: number, rawCountry: RawCountry): CountryModel {
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
        const rows: Array<InfoRowModel> = getInfoRows(infoForRows);

        return new CountryModel(name, flagUrl, timezone, rows);
    }

    function getInfoRows(infos: Array<Object>) {
        console.log(infos); // console
        return infos.map(rowInfo => new InfoRowModel(rowInfo.name, rowInfo.value));
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
            const countryModel = getCountryModel(countryIdx, res.data);
            setCountryModelArr([...countryModelArr, countryModel]);
            console.log("countryModel in addNewCountry"); // console
            console.log(countryModel); // console

            const center: Coord = { lat: res.data.latlng[0], lng: res.data.latlng[1] };
            const mapModel = new MapModel(getAllCoords(countryIdx), center);
            setMapModel([...mapModels, mapModel]);
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

    async function setNextCountry(): Promise<void> {
        try {
            setSearching(false);
            if (currIdx === countryModelArr.length - 1) {
                await addNewCountry()
                console.log("added a new country");
            }
            setCurrIdx(currIdx + 1);
        } catch (err) {
            setError(err.message);
            setLoad(false);
        }

    }

    async function setNextCountryAndReplace(countryIdx: number): Promise<void> {
        setSearching(false);
        await addNewCountry(countryIdx);
        console.log("added a new country");
        setCurrIdx(currIdx + 1);
        countryModelArr.splice(currIdx + 1); // remove elements after it
    }

    // console.log("mapModel in mainLayout");
    // console.log(mapModels);
    // console.log("currIdx");
    // console.log(currIdx);
    // console.log("countryModels");
    // console.log(countryModelArr);
    // console.log("countryModel");
    // console.log(countryModelArr[currIdx]);

    // main
    if (!load)
        return <div> Loading... </div>;

    else if (error)
        return <li> {error.message} </li>;

    else {
        return (
            <Container className="main-layout">
                <Grid>
                    <Grid.Row className="map-row">
                        <MapComponent mapModel={mapModels[currIdx]} />
                    </Grid.Row>

                    <Grid.Row>
                        <NameSection
                            name={countryModelArr[currIdx].name}
                            timezone={countryModelArr[currIdx].timezone}
                            flagUrl={countryModelArr[currIdx].flagUrl}
                            isSearching={isSearching}
                            setSearching={(state: boolean) => setSearching(state)}
                            changeCountry={(index: number) => setNextCountryAndReplace(index)}
                        />
                    </Grid.Row>

                    <Grid.Row>
                        <InfoPanel infoRows={countryModelArr[currIdx].infoRows} />
                    </Grid.Row>

                    <Button icon='left arrow' labelPosition='left' onClick={setPrevCountry} />
                    <Button icon='right arrow' labelPosition='right' onClick={async () => await setNextCountry()} />
                </Grid>
            </Container>
        );
    }
}

export default MainLayout;
