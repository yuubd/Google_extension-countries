import React from "react";

import { SettingButtonModel } from "./settingButtonModel";
import "./settingButtonStyle.css";

function SettingButtonComponent(props: {isSettingsPage: boolean, setSettingsPage: Function}) {
    const settingButtonModel = new SettingButtonModel(props.isSettingsPage);

    return (
        <div className="setting-button">
            <img
                className={`setting-button__icon setting-button__icon--${settingButtonModel.icon}`}
                src={settingButtonModel.iconSrc}
                onClick={() => props.setSettingsPage(!settingButtonModel.isSettingsPage)}
            />
        </div>
    );
}

export default SettingButtonComponent;