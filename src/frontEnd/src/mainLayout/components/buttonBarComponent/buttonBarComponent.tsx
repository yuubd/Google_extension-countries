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
                className={`button-bar__hoverable${buttonBarModel.isLeftDisabled ? " button-bar__hoverable--disabled" : ""}`}
                onClick={() => onLeftClicked()}>
                { !buttonBarModel.isLeftDisabled &&
                    <div className="button-bar__side button-bar__side--left">
                        <i className="angle left huge icon" />
                    </div>
                }
            </div>
            <div className="button-bar__hoverable" onClick={() => props.onClickNext()}>
                <div className="button-bar__side button-bar__side--right">
                    <i className="angle right huge icon" />
                </div>
            </div>
        </div>
    );
}

export default ButtonBarComponent;
