import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: {currIdx: number, onClickPrev: Function, onClickNext: Function}) {
    const buttonBarModel = new ButtonBarModel(props.currIdx);

    function onLeftClicked() {
        if (!buttonBarModel.isLeftDisabled) {
            props.onClickPrev();
        }
    }

    return (
        <div className="button-bar">
            <div
                className={`button-bar__side${buttonBarModel.isLeftDisabled ? " button-bar__side--disabled" : ""}`}
                onClick={() => onLeftClicked()}>
                { !buttonBarModel.isLeftDisabled && <i className="reply big icon" /> }
            </div>
            <div className="button-bar__side" onClick={() => props.onClickNext()}>
                <i className="share big icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;
