import React, { useState, useEffect } from "react";
import "./settingsStyle.css";

import { PageHeaderComponent } from "../../components/pageHeaderComponent";
import { SettingRowComponent } from "../../components/settingRowComponent";
import { SettingModalComponent } from "../../components/settingModalComponent";
import { ButtonBar } from "../../components/buttonBar";
import { SettingsModel, SETTING_TYPES } from "./settingsModel";

function SettingsComponent(props: {currPage: string, setCurrPage: Function, isDarkTheme: boolean, setDarkTheme: Function}) {
    const settingsModel = new SettingsModel(props.currPage, props.setCurrPage, props.isDarkTheme, props.setDarkTheme);

    // states
    const [modalType, setModalType]: [string, Function] = useState(""); // ""(closed), "threshold", "theme"
    const [thresholdIdx, setThresholdIdx]: [number, Function] = useState(0);

    // states for modal
    const [modalThresholdIdx, setModalThresholdIdx]: [number, any] = useState(0);
    const [modalThemeIdx, setModalThemeIdx]: [number, any] = useState(settingsModel.themeIndex);

    // componentDidMount
    useEffect(() => {
        settingsModel.loadTimeThreshold(setThresholdIdx, setModalThresholdIdx);
    }, []);

    return (
        <div className="settings-layout">
            { (modalType === SETTING_TYPES.THRESHOLD) &&
                <SettingModalComponent
                    title="Time Threshold"
                    options={settingsModel.getModalOptions(SETTING_TYPES.THRESHOLD)}
                    selected={settingsModel.getModalValue(SETTING_TYPES.THRESHOLD, modalThresholdIdx)}
                    onOptionChanged={(index: number) => setModalThresholdIdx(index)}
                    onSaveClicked={() => settingsModel.onModalSaveClicked(SETTING_TYPES.THRESHOLD, modalThresholdIdx, setModalType, setThresholdIdx)}
                />
            }
            { (modalType === SETTING_TYPES.THEME) &&
                <SettingModalComponent
                    title="Theme"
                    options={settingsModel.getModalOptions(SETTING_TYPES.THEME)}
                    selected={settingsModel.getModalValue(SETTING_TYPES.THEME, modalThemeIdx)}
                    onOptionChanged={(index: number) => setModalThemeIdx(index)}
                    onSaveClicked={() => settingsModel.onModalSaveClicked(SETTING_TYPES.THEME, modalThemeIdx, setModalType)}
                />
            }
            <PageHeaderComponent title="Settings" onGoBackClicked={()=> settingsModel.goToMainPage()} />
            <div className="settings-layout__settings">
                <SettingRowComponent
                    title="Time Threshold"
                    description={settingsModel.getModalValue(SETTING_TYPES.THRESHOLD, thresholdIdx)}
                    onSettingClick={() => setModalType(SETTING_TYPES.THRESHOLD)}
                />
                <SettingRowComponent
                    title="Theme"
                    description={settingsModel.getModalValue(SETTING_TYPES.THEME, settingsModel.themeIndex)}
                    onSettingClick={() => setModalType(SETTING_TYPES.THEME)}
                />
                <SettingRowComponent
                    title="App Version"
                    description="00.00.00"
                />
            </div>
            <ButtonBar
                onClickPrev={() => console.log('prev')}
                onClickNext={() => console.log('next')}
                currPage={ settingsModel.currPage }
                setCurrPage={() => settingsModel.goToMainPage()}
            />
        </div>
    );
}

export default SettingsComponent;