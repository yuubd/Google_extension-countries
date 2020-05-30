import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: {currIdx: number, isSettingsPage: boolean, onClickPrev: Function, onClickNext: Function}) {
    const buttonBarModel = new ButtonBarModel(props.currIdx, props.isSettingsPage);

    function onButtonClick(isPrev: boolean) {
        if (isPrev && !buttonBarModel.isLeftDisabled) {
            props.onClickPrev();
        } else if (!isPrev && !buttonBarModel.isRightDisabled) {
            props.onClickNext();
        }
    }

    return (
        <div className="button-bar">
            <div
                className={`button-bar__button button-bar__button--${buttonBarModel.isLeftDisabled ? "disabled" : "enabled"}`}
                onClick={() => onButtonClick(true)}>
                <i className="reply large icon" />
            </div>
            <div
                className={`button-bar__button button-bar__button--${buttonBarModel.isRightDisabled ? "disabled" : "enabled"}`}
                onClick={() => onButtonClick(false)}>
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;
