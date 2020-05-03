import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Container, Grid } from 'semantic-ui-react'
import './mainLayout.css';

import { InfoPanel } from '../../components/infoPanel'
import { Map } from '../../components/map'
import { Flag } from '../../components/flag'
import { InfoRowModel } from '../../data/models';
import { getRandomAlphaCode } from './utils';
import { CountryModel } from '../../data/models/CountryModel';

type RawCountry = {
    name: string,
    flag: string,
    subregion: string,
    capital: string,
    population: string,
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
    const [countryModelArr, setCountruModelArr]: [Array<CountryModel>, any] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    
    // componentDidMount
    useEffect(() => {
        chrome.storage.local.get("alphaCode", async (data) => {
            let alphaCode = data.alphaCode;
            if (typeof data.alphaCode == "undefined") { 
                alphaCode = getRandomAlphaCode();
            }
            try {
                const res = await getRestCountry(alphaCode);
                console.log(res.data); // console
                const countryModel = getCountryModel(res.data);
                setCountruModelArr([...countryModelArr, countryModel]);
                setLoad(true);
            } catch(err) {
                setError(err.message);
                setLoad(false);
            }
        })
    }, []);

    // componentWillUnmount
    useEffect(() => {
        return () => {
            chrome.storage.local.set({alphaCode: undefined});
            alert('will unmount');
        }
    }, []);
    async function getRestCountry(alphaCode: string): Promise<JSON> {
        return axios.get(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`)
    }

    // Below two functions are deserialing JSON to data models
    function getCountryModel(rawCountry: RawCountry): CountryModel {
        const name: string = rawCountry.name;
        const flagUrl: string = rawCountry.flag;

        const continent = rawCountry.subregion;
        const population = rawCountry.population;
        const capital = rawCountry.capital;
        const language = rawCountry.languages[0].name;
        const currency = rawCountry.currencies[0].name;
    
        const infoForRows = [
            {name: ROW_TYPES.continent , value: continent},
            {name: ROW_TYPES.capital   , value: capital},
            {name: ROW_TYPES.pupolation, value: population},
            {name: ROW_TYPES.language  , value: language},
            {name: ROW_TYPES.currency  , value: currency}
        ]
        const rows: Array<InfoRowModel> = getInfoRows(infoForRows);

        return new CountryModel(name, flagUrl, rows);
    }

    function getInfoRows(infos: Array<Object>) {
        console.log(infos); // console
        return infos.map(rowInfo => new InfoRowModel(rowInfo.name, rowInfo.value));
    }
    
    async function addNewCountry(): Promise<void> {
        const alphaCode = getRandomAlphaCode();
        try {
            const res = await getRestCountry(alphaCode);
            const countryModel = getCountryModel(res.data);
            setCountruModelArr([...countryModelArr, countryModel]);
            console.log(countryModelArr); // console
            setCurrIdx(currIdx + 1);
        } catch (err) {
            console.log(err);
        }
    }

    // used in the template
    function setPrevCountry(): void {
        if (currIdx > 0)
            setCurrIdx(currIdx - 1);
    }

    function setNextCountry(): void {
        if (currIdx === countryModelArr.length - 1)
            addNewCountry();
        else
            setCurrIdx(currIdx + 1);
    }
    
    // main
    if (!load)
        return <div> Loading... </div>; 
    
    else if (error)
        return <li> { error.message } </li>; 

    else 
        return (
            <Container className="main-layout">
                <Grid>
                    <Grid.Row>
                        <Map country={countryModelArr[currIdx].name} />
                    </Grid.Row>

                    <Grid.Row className="name-flag">
                        <Grid.Column textAlign="center" verticalAlign="middle" width={10}>
                            <div className="country-name">{countryModelArr[currIdx].name}</div>
                        </Grid.Column>
                        <Grid.Column textAlign="center" verticalAlign="middle" width={5}>
                            <Flag flagUrl={countryModelArr[currIdx].flagUrl} />
                        </Grid.Column>
                    </Grid.Row>

                    <InfoPanel infoRows={countryModelArr[currIdx].infoRows} />
                    
                
                    <Button icon='left arrow' labelPosition='left' onClick={setPrevCountry} />
                    <Button icon='right arrow' labelPosition='right' onClick={setNextCountry} />
                </Grid>
            </Container>
        );
}

export default MainLayout;
