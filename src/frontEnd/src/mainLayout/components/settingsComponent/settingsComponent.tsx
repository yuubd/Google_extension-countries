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

const THRESHOLD_SETTING: SettingItem = {
    id: "threshold",
    title: "Time Threshold",
    labels: ["1 minute", "2 minutes", "5 minutes", "10 minutes", "disable"],
    values: [60, 120, 300, 600, 0]
}

const THEME_SETTING: SettingItem = {
    id: "theme",
    title: "Theme",
    labels: ["Light Mode", "Dark Mode"],
    values: [false, true]
}

const VERSION_SETTING: SettingItem = {
    id: "version",
    title: "App Version",
    labels: ["1.0"],
    values: [0]
}

const settingItems: SettingItem[] = [THRESHOLD_SETTING, THEME_SETTING, VERSION_SETTING];

function SettingsComponent(props: {setSettingsPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {
    const settingsModel = new SettingsModel(props.isDarkTheme);

    // states
    const [modalType, setModalType]: [string, Function] = useState(""); // closed: ""
    const [thresholdIdx, setThresholdIdx]: [number, Function] = useState(1); // default: 2 mins

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

    function getIndexFromType(type: string): number {
        if (type === THRESHOLD_SETTING.id) {
            return thresholdIdx;
        } else if (type === THEME_SETTING.id) {
            return settingsModel.themeIdx;
        } else {
            return 0;
        }
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
                    selectedIdx={ getIndexFromType(modalType) }
                    onSaveClicked={(index: number) => onModalSaveClicked(index)}
                />
            }
            <PageHeaderComponent title="Settings" onGoBackClicked={()=> props.setSettingsPage(false)} />
            <div className="settings-layout__settings">
                { settingItems.map((setting: SettingItem, idx: number) =>
                    <SettingRowComponent
                        key={ idx }
                        settingItem={ setting }
                        selectedIdx={ getIndexFromType(setting.id) }
                        setModalType={(type: string) => setModalType(type)}
                    />
                )}
            </div>
        </div>
    );
}

export default SettingsComponent;
