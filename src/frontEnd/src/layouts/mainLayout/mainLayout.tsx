import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Container, Grid } from 'semantic-ui-react'
import './mainLayout.css';

import { InfoPanel } from '../../components/infoPanel'
import { Map } from '../../components/map'
import { NameSection } from '../../components/nameSection'
import { InfoRowModel } from '../../data/models';
import { getRandomAlphaCode } from './utils';
import { CountryModel } from '../../data/models/CountryModel';

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
    const [countryModelArr, setCountruModelArr]: [Array<CountryModel>, any] = useState([]);
    const [isSearching, setSearching]: [boolean, any] = useState(false);
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
        const timezone: string = rawCountry.timezones[0]; // use index 0 (for now)

        const continent = rawCountry.region;
        const population = formatNumber(rawCountry.population);
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
        for (let i = numStr.length-1; i > -1; i--) {
            if (acc === 0) {
                res = "," + res;
                acc = 2;
           } else { acc--; }
           
           res = numStr[i] + res;
         }
        return res;
    }
    
    async function addNewCountry(code: string = ""): Promise<void> {
        const alphaCode = code.length > 0 ? code : getRandomAlphaCode();
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
        setSearching(false);
        if (currIdx > 0)
            setCurrIdx(currIdx - 1);
    }

    function setNextCountry(): void {
        setSearching(false);
        if (currIdx === countryModelArr.length - 1)
            addNewCountry();
        else
            setCurrIdx(currIdx + 1);
    }

    function setNextCountryAndReplace(code: string): void {
        setSearching(false);
        addNewCountry(code);
        countryModelArr.splice(currIdx+1); // remove elements after it
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

                    <Grid.Row>
                        <NameSection
                            name={countryModelArr[currIdx].name}
                            timezone={countryModelArr[currIdx].timezone}
                            flagUrl={countryModelArr[currIdx].flagUrl}
                            isSearching={isSearching}
                            setSearching={(state: boolean) => setSearching(state)}
                            changeCountry={(code: string)=>setNextCountryAndReplace(code)}
                        />
                    </Grid.Row>
                    
                    <Grid.Row>
                        <InfoPanel infoRows={countryModelArr[currIdx].infoRows} />
                    </Grid.Row>
                
                    <Button icon='left arrow' labelPosition='left' onClick={setPrevCountry} />
                    <Button icon='right arrow' labelPosition='right' onClick={() => setNextCountry()} />
                </Grid>
            </Container>
        );
}

export default MainLayout;
