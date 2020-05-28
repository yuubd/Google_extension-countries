import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: {isSettingsPage: boolean, setSettingsPage: Function, onClickPrev: Function, onClickNext: Function}) {
    const buttonBarModel = new ButtonBarModel(props.isSettingsPage);

    return (
        <div className={`button-bar button-bar--${buttonBarModel.isSettingsPage ? "settings-page" : "enabled"}`}>
            <div
                className="button-bar__button button-bar__button--settings"
                onClick={() => props.setSettingsPage(!buttonBarModel.isSettingsPage)}
            >
                <i className="setting large icon" />
            </div>
            <div
                className="button-bar__button button-bar__button--center"
                onClick={() => (buttonBarModel.isSettingsPage ? "" : props.onClickPrev())}
            >
                <i className="reply large icon" />
            </div>
            <div
                className="button-bar__button"
                onClick={() => (buttonBarModel.isSettingsPage ? "" : props.onClickNext())}
            >
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;
