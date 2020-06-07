import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

function ButtonBarComponent(props: {currIdx: number, onHover: Function, onClickPrev: Function, onClickNext: Function}) {
    const buttonBarModel = new ButtonBarModel(props.currIdx);

    function onLeftHovered(isEnter: boolean) {
        if (!buttonBarModel.isLeftDisabled) {
            props.onHover("left", isEnter);
        }
    }

    function onLeftClicked() {
        if (!buttonBarModel.isLeftDisabled) {
            props.onClickPrev();
        }
    }

    return (
        <div className="button-bar">
            <div
                className={`button-bar__hoverable${buttonBarModel.isLeftDisabled ? " button-bar__hoverable--disabled" : ""}`}
                onMouseEnter={() => onLeftHovered(true)}
                onMouseLeave={() => onLeftHovered(false)}
                onClick={() => onLeftClicked()}>
                { !buttonBarModel.isLeftDisabled &&
                    <div className="button-bar__side button-bar__side--left">
                        <i className="angle left huge icon" />
                    </div>
                }
            </div>
            <div
                className="button-bar__hoverable"
                onClick={() => props.onClickNext()}
                onMouseEnter={() => props.onHover("right", true)}
                onMouseLeave={() => props.onHover("right", false)}>
                <div className="button-bar__side button-bar__side--right">
                    <i className="angle right huge icon" />
                </div>
            </div>
        </div>
    );
}

export default ButtonBarComponent;
