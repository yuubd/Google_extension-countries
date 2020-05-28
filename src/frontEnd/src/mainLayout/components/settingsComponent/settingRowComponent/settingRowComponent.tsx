import React from "react";
import "./settingRowStyle.css";
import { SettingRowModel } from "./settingRowModel";
import { SettingItem } from "../settingsComponent";

function SettingRowComponent(props: { settingItem: SettingItem, selectedIdx: number, setModalType: Function }) {
    const settingRowModel = new SettingRowModel(props.settingItem, props.selectedIdx);

    return (
        <div
            className={ `setting-row ${ settingRowModel.isClickable ? "setting-row--clickable" : "" }` }
            onClick={() => (settingRowModel.isClickable ? props.setModalType(settingRowModel.type) : "")}
        >
            <div className="setting-row__title">{ settingRowModel.title }</div>
            <div className="setting-row__description">{ settingRowModel.description }</div>
        </div>
    );
}

export default SettingRowComponent;
