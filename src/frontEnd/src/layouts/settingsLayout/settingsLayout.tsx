import React, { useState, useEffect } from 'react';
import './settingsLayout.css';

import { PageHeader } from '../../components/pageHeader';
import { SettingMenu } from '../../components/settingMenu';
import { SettingModal } from '../../components/settingModal';
import { ButtonBar } from '../../components/buttonBar';

function SettingsLayout(props: {currPage: string, setCurrPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {

    // states
    const [modalType, setmodalType]: [string, any] = useState(""); // ""(closed), "threshold", "theme"
    const [thresholdIdx, setThresholdIdx]: [number, any] = useState(0);

    // states for modal
    const [modalThresholdIdx, setmodalThresholdIdx]: [number, any] = useState(0);
    const [modalThemeIdx, setmodalThemeIdx]: [number, any] = useState(props.isDarkTheme ? 1 : 0);

    // setting options
    const thresholdTimeArr: number[] = [60, 120, 300, 600, 0];
    const thresholdArr: string[] = ["1 minute", "2 minutes", "5 minutes", "10 minutes", "disable"];
    const themeArr: string[] = ["Light Mode", "Dark Mode"];

    // componentDidMount
    useEffect(() => {
        // load timeThreshold
        chrome.storage.local.get("timeThreshold", (storage) => {
            if (typeof storage.timeThreshold === "number") {
                let seconds: number = storage.timeThreshold;
                for (let index in thresholdTimeArr) {
                    if (seconds === thresholdTimeArr[index]) {
                        setThresholdIdx(index);
                        setmodalThresholdIdx(index);
                        break;
                    }
                }
            }
        });
    }, []);

    function onModalSaveClicked() {
        if (modalType === "threshold") {
            chrome.storage.local.set({timeThreshold: thresholdTimeArr[modalThresholdIdx]});
            setThresholdIdx(modalThresholdIdx);
        } else if (modalType === "theme") {
            chrome.storage.local.set({isDarkTheme: (modalThemeIdx === 1)});
            props.setDarkTheme(modalThemeIdx === 1);
        }
        setmodalType("");
    }

    return (
        <div className="settings-layout">
            { (modalType === "threshold") &&
                <SettingModal
                    title="Time Threshold"
                    options={thresholdArr}
                    selected={thresholdArr[modalThresholdIdx]}
                    onOptionChanged={(index: number) => setmodalThresholdIdx(index)}
                    onSaveClicked={() => onModalSaveClicked()}
                />
            }
            { (modalType === "theme") &&
                <SettingModal
                    title="Theme"
                    options={themeArr}
                    selected={themeArr[modalThemeIdx]}
                    onOptionChanged={(index: number) => setmodalThemeIdx(index)}
                    onSaveClicked={() => onModalSaveClicked()}
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