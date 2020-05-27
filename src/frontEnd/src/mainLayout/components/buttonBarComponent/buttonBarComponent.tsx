import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: { onClickPrev: Function, onClickNext: Function, isDarkTheme: boolean, setDarkTheme: Function }) {
    const buttonBarModel = new ButtonBarModel(props.isDarkTheme);

    function onSettingsClicked(): void {
        props.setDarkTheme(!buttonBarModel.isDarkTheme);
    }

    return (
        <div className="button-bar">
            <div className="button-bar__button button-bar__button--settings" onClick={() => onSettingsClicked()}>
                <i className="setting large icon" />
            </div>
            <div className="button-bar__button button-bar__button--center" onClick={() => props.onClickPrev()}>
                <i className="reply large icon" />
            </div>
            <div className="button-bar__button" onClick={() => props.onClickNext()}>
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;