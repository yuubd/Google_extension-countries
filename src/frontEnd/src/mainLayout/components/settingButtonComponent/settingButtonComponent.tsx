import React from "react";

import "./settingButtonStyle.css";

function SettingButtonComponent(props: {setSettingsPage: Function}) {

    return (
        <div className="setting-button">
            <i className="setting large icon setting-button__icon" onClick={() => props.setSettingsPage(true)} />
        </div>
    );
}

export default SettingButtonComponent;