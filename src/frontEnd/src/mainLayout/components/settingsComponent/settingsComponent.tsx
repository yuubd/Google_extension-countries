import React, { useState, useEffect } from "react";
import "./settingsStyle.css";

import { PageHeaderComponent } from "./pageHeaderComponent";
import { SettingRowComponent } from "./settingRowComponent";
import { SettingModalComponent } from "./settingModalComponent";
import { SettingsModel, THRESHOLD_TIMES, THRESHOLD_LABELS, THEME_LABELS } from "./settingsModel";

function SettingsComponent(props: {setSettingsPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {
    const settingsModel = new SettingsModel(props.isDarkTheme);

    // states
    const [modalType, setModalType]: [string, Function] = useState(""); // ""(closed), "threshold", "theme"
    const [thresholdIdx, setThresholdIdx]: [number, Function] = useState(0);

    // states for modal
    const [modalThresholdIdx, setModalThresholdIdx]: [number, any] = useState(0);
    const [modalThemeIdx, setModalThemeIdx]: [number, any] = useState(settingsModel.themeIndex);

    // componentDidMount
    useEffect(() => {
        // load time threshold from local storage
        chrome.storage.local.get("timeThreshold", (storage) => {
            if (typeof storage.timeThreshold === "number") {
                let seconds: number = storage.timeThreshold;
                for (let index in THRESHOLD_TIMES) {
                    if (seconds === THRESHOLD_TIMES[index]) {
                        setThresholdIdx(index);
                        setModalThresholdIdx(index);
                        break;
                    }
                }
            }
        });
    }, []);

    function onModalSaveClicked(): void {
        if (modalType === "threshold") {
            chrome.storage.local.set({ timeThreshold: THRESHOLD_TIMES[modalThresholdIdx] });
            setThresholdIdx(modalThresholdIdx);
        } else if (modalType === "theme") {
            chrome.storage.local.set({ isDarkTheme: (modalThemeIdx === 1) });
            props.setDarkTheme(modalThemeIdx === 1);
        }
        setModalType("");
    }

    return (
        <div className="settings-layout">
            { (modalType === "threshold") &&
                <SettingModalComponent
                    title="Time Threshold"
                    options={settingsModel.getModalOptions("threshold")}
                    selected={settingsModel.getModalValue("threshold", modalThresholdIdx)}
                    onOptionChanged={(index: number) => setModalThresholdIdx(index)}
                    onSaveClicked={() => onModalSaveClicked()}
                />
            }
            { (modalType === "theme") &&
                <SettingModalComponent
                    title="Theme"
                    options={settingsModel.getModalOptions("theme")}
                    selected={settingsModel.getModalValue("theme", modalThemeIdx)}
                    onOptionChanged={(index: number) => setModalThemeIdx(index)}
                    onSaveClicked={() => onModalSaveClicked()}
                />
            }
            <PageHeaderComponent title="Settings" onGoBackClicked={()=> props.setSettingsPage(false)} />
            <div className="settings-layout__settings">
                <SettingRowComponent
                    title="Time Threshold"
                    description={settingsModel.getModalValue("threshold", thresholdIdx)}
                    onSettingClick={() => setModalType("threshold")}
                />
                <SettingRowComponent
                    title="Theme"
                    description={settingsModel.getModalValue("theme", settingsModel.themeIndex)}
                    onSettingClick={() => setModalType("theme")}
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