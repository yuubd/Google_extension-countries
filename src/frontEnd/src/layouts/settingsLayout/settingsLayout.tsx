import React, { useState } from 'react';
import './settingsLayout.css';

import { PageHeader } from '../../components/pageHeader';
import { SettingMenu } from '../../components/settingMenu';
import { SettingModal } from '../../components/settingModal';
import { ButtonBar } from '../../components/buttonBar';

function SettingsLayout(props: {currPage: string, setCurrPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {

    // states
    const [modalType, setmodalType]: [string, any] = useState(""); // ""(closed), "threshold", "theme"
    const [thresholdIdx, setThresholdIdx]: [number, any] = useState(3);
    const [themeIdx, setThemeIdx]: [number, any] = useState(props.isDarkTheme ? 1 : 0);

    // setting options
    const thresholdArr = ["10 secs", "20 secs", "1 min", "2 mins"];
    const themeArr = ["Light Mode", "Dark Mode"];

    function onModalCloseClicked() {
        if (modalType === "threshold") {
            console.log("threshold set to " + thresholdArr[thresholdIdx]);
        } else if (modalType === "theme") {
            chrome.storage.local.set({isDarkTheme: (themeIdx === 1)});
            props.setDarkTheme(themeIdx === 1);
        }
        setmodalType("");
    }

    return (
        <div className="settings-layout">
            { (modalType === "threshold") &&
                <SettingModal
                    title="Time Threshold"
                    options={thresholdArr}
                    selected={thresholdArr[thresholdIdx]}
                    onOptionChanged={(index: number) => setThresholdIdx(index)}
                    onCloseClicked={() => onModalCloseClicked()}
                />
            }
            { (modalType === "theme") &&
                <SettingModal
                    title="Theme"
                    options={themeArr}
                    selected={themeArr[themeIdx]}
                    onOptionChanged={(index: number) => setThemeIdx(index)}
                    onCloseClicked={() => onModalCloseClicked()}
                />
            }
            <PageHeader title="Settings" onGoBackClicked={()=> props.setCurrPage("")} />
            <div className="settings-layout__settings">
                <SettingMenu title="Time Threshold" description={thresholdArr[thresholdIdx]} onSettingClick={() => setmodalType("threshold")} />
                <SettingMenu title="Theme" description={themeArr[props.isDarkTheme ? 1 : 0]} onSettingClick={() => setmodalType("theme")} />
                <SettingMenu title="Bookmarks" description="Re-visit your saved country cards" />
                <SettingMenu title="Send Feedback" description="Tell us what you think" />
                <SettingMenu title="App Version" description="00.00.00" />
            </div>
            <ButtonBar
                onClickPrev={() => console.log('prev')}
                onClickNext={() => console.log('next')}
                currPage={props.currPage}
                setCurrPage={(page: string) => props.setCurrPage(page)}
            />
        </div>
    );
}

export default SettingsLayout;