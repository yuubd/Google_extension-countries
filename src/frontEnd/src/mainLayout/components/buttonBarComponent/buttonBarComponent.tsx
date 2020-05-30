import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: {isSettingsPage: boolean, onClickPrev: Function, onClickNext: Function}) {
    const buttonBarModel = new ButtonBarModel(props.isSettingsPage);

    function onButtonClick(isPrev: boolean) {
        if (!buttonBarModel.isDisabled) {
            if (isPrev) {
                props.onClickPrev();
            } else {
                props.onClickNext();
            }
        }
    }

    return (
        <div className={`button-bar ${buttonBarModel.isDisabled ? "button-bar--disabled" : "button-bar--enabled"}`}>
            <div className="button-bar__button" onClick={() => onButtonClick(true)}>
                <i className="reply large icon" />
            </div>
            <div className="button-bar__button" onClick={() => onButtonClick(false)}>
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;
