import React from 'react';
import './settingsLayout.css';

import { PageHeader } from '../../components/pageHeader';
import { SettingMenu } from '../../components/settingMenu';

function SettingsLayout(props: {setCurrPage: Function}) {
    return (
        <div className="settings-layout">
            <PageHeader title="Settings" onGoBackClicked={()=> props.setCurrPage("")} />
            <div className="settings-layout__settings">
                <SettingMenu title="Time Threshold" description="2 mins" onSettingClick={() => console.log("set threshold")} />
                <SettingMenu title="Theme" description="Dark Mode" onSettingClick={() => console.log("set theme")} />
                <SettingMenu title="Bookmarks" description="Re-visit your saved country cards" />
                <SettingMenu title="Send Feedback" description="Tell us what you think" />
                <SettingMenu title="App Version" description="00.00.00" />
            </div>
        </div>
    );
}

export default SettingsLayout;