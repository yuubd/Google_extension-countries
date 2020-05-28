import React from "react";

import { ButtonBarModel } from "./buttonBarModel";
import "./buttonBarStyle.css";

type ButtonBarProps = {
    currPage: string,
    setCurrPage: Function,
    onClickPrev?: Function,
    onClickNext?: Function
}

function ButtonBarComponent(props: ButtonBarProps) {
    // const buttonBarModel = new ButtonBarModel(props.isDarkTheme);

    return (
        <div className={`button-bar button-bar--${props.currPage === "" ? "enabled" : "disabled"}`}>
            <div
                className={`button-bar__button button-bar__button--settings${props.currPage === "settings" ? " button-bar__button--selected" : ""}`}
                onClick={() => ((props.currPage === "settings") ? props.setCurrPage("") : props.setCurrPage("settings"))}
            >
                <i className="setting large icon" />
            </div>
            <div className="button-bar__button button-bar__button--center" onClick={() => (typeof props.onClickPrev === "undefined") ? "" : props.onClickPrev()}>
                <i className="reply large icon" />
            </div>
            <div className="button-bar__button" onClick={() => (typeof props.onClickNext === "undefined") ? "" : props.onClickNext()}>
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;