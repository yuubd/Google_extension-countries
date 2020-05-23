import React, { useState } from 'react';
import './settingsLayout.css';

import { PageHeader } from '../../components/pageHeader';
import { SettingMenu } from '../../components/settingMenu';
import { SettingModal } from '../../components/settingModal';

function SettingsLayout(props: {setCurrPage: Function}) {

    // states
    const [modalType, setmodalType]: [string, any] = useState(""); // "" - modal closed
    const [thresholdIdx, setThresholdIdx]: [number, any] = useState(3);
    const [themeIdx, setThemeIdx]: [number, any] = useState(0);

    // setting options
    const thresholdArr = ["10 secs", "20 secs", "1 min", "2 mins"];
    const themeArr = ["Light Mode", "Dark Mode"];

    return (
        <div className="settings-layout">
            { (modalType === "threshold") &&
                <SettingModal
                    title="Time Threshold"
                    options={thresholdArr}
                    selected={thresholdArr[thresholdIdx]}
                    onOptionChanged={(index: number) => setThresholdIdx(index)}
                    onCloseClicked={() => setmodalType("")}
                />
            }
            { (modalType === "theme") &&
                <SettingModal
                    title="Theme"
                    options={themeArr}
                    selected={themeArr[themeIdx]}
                    onOptionChanged={(index: number) => setThemeIdx(index)}
                    onCloseClicked={() => setmodalType("")}
                />
            }
            <PageHeader title="Settings" onGoBackClicked={()=> props.setCurrPage("")} />
            <div className="settings-layout__settings">
                <SettingMenu title="Time Threshold" description={thresholdArr[thresholdIdx]} onSettingClick={() => setmodalType("threshold")} />
                <SettingMenu title="Theme" description={themeArr[themeIdx]} onSettingClick={() => setmodalType("theme")} />
                <SettingMenu title="Bookmarks" description="Re-visit your saved country cards" />
                <SettingMenu title="Send Feedback" description="Tell us what you think" />
                <SettingMenu title="App Version" description="00.00.00" />
            </div>
        </div>
    );
}

export default SettingsLayout;