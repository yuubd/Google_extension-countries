import React, { useState, useEffect } from "react";

import { SettingModalComponent } from "./settingModalComponent";
import { PageHeaderComponent } from "./pageHeaderComponent";
import { SettingRowComponent } from "./settingRowComponent";

import { SettingsModel } from "./settingsModel";
import "./settingsStyle.css";

export type SettingItem = {
    id: string,
    title: string,
    labels: string[],
    values: any[]
}

export const THRESHOLD_SETTING: SettingItem = {
    id: "threshold",
    title: "Time Threshold",
    labels: ["1 minute", "2 minutes", "5 minutes", "10 minutes", "disable"],
    values: [60, 120, 300, 600, 0]
}

export const THEME_SETTING: SettingItem = {
    id: "theme",
    title: "Theme",
    labels: ["Light Mode", "Dark Mode"],
    values: [false, true]
}

function SettingsComponent(props: {setSettingsPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {
    const settingsModel = new SettingsModel(props.isDarkTheme);

    // states
    const [modalType, setModalType]: [string, Function] = useState(""); // closed: ""
    const [thresholdIdx, setThresholdIdx]: [number, Function] = useState(0);

    // componentDidMount
    useEffect(() => {
        // load time threshold from local storage
        chrome.storage.local.get("timeThreshold", (storage) => {
            if (typeof storage.timeThreshold === "number") {
                let seconds: number = storage.timeThreshold;
                for (let index in THRESHOLD_SETTING.values) {
                    if (seconds === THRESHOLD_SETTING.values[index]) {
                        setThresholdIdx(index);
                        break;
                    }
                }
            }
        });
    }, []);

    function setTheme(index: number): void {
        props.setDarkTheme(index === 1);
    }

    function onModalSaveClicked(index: number): void {
        if (modalType === THRESHOLD_SETTING.id) {
            chrome.storage.local.set({ timeThreshold: THRESHOLD_SETTING.values[index] });
            setThresholdIdx(index);
        } else if (modalType === THEME_SETTING.id) {
            chrome.storage.local.set({ isDarkTheme: THEME_SETTING.values[index] });
            setTheme(index);
        }
        setModalType(""); // close modal
    }

    return (
        <div className="settings-layout">
            { (modalType !== "") &&
                <SettingModalComponent
                    settings={ (modalType === THRESHOLD_SETTING.id) ? THRESHOLD_SETTING : THEME_SETTING }
                    selectedIdx={ (modalType === THRESHOLD_SETTING.id) ? thresholdIdx : settingsModel.themeIdx }
                    onSaveClicked={(index: number) => onModalSaveClicked(index)}
                />
            }
            <PageHeaderComponent title="Settings" onGoBackClicked={()=> props.setSettingsPage(false)} />
            <div className="settings-layout__settings">
                <SettingRowComponent
                    title={ THRESHOLD_SETTING.title }
                    description={ THRESHOLD_SETTING.labels[thresholdIdx] }
                    onSettingClick={() => setModalType(THRESHOLD_SETTING.id)}
                />
                <SettingRowComponent
                    title={ THEME_SETTING.title }
                    description={ THEME_SETTING.labels[settingsModel.themeIdx] }
                    onSettingClick={() => setModalType(THEME_SETTING.id)}
                />
                <SettingRowComponent
                    title="App Version"
                    description="00.00.00"
                />
            </div>
        </div>
    );
}

export default SettingsComponent;