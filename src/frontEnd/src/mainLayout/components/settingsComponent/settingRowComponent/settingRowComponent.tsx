import React from "react";
import "./settingRowStyle.css";
import { SettingRowModel } from "./settingRowModel";

function SettingRowComponent(props: { title: string, description: string, onSettingClick?: Function }) {
    const settingRowModel = new SettingRowModel(props.title, props.description);

    return (
        <div
            className={ `setting-row ${ props.onSettingClick ? "setting-row--clickable" : "" }` }
            onClick={() => (props.onSettingClick ? props.onSettingClick() : "")}
        >
            <div className="setting-row__title">{ settingRowModel.title }</div>
            <div className="setting-row__description">{ settingRowModel.description }</div>
        </div>
    );
}

export default SettingRowComponent;