import React from "react";

import { SettingButtonModel } from "./settingButtonModel";
import "./settingButtonStyle.css";

function SettingButtonComponent(props: {isSettingsPage: boolean, setSettingsPage: Function}) {
    const settingButtonModel = new SettingButtonModel(props.isSettingsPage);

    return (
        <div className="setting-button">
            <i
                className={`${settingButtonModel.icon} large icon setting-button__icon`}
                onClick={() => props.setSettingsPage(!settingButtonModel.isSettingsPage)}
            />
        </div>
    );
}

export default SettingButtonComponent;