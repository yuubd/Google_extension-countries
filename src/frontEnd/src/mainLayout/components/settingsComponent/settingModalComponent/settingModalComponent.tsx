import React, { useState } from "react";

import { SettingItem } from "../settingsComponent";

import { SettingModalModel } from './settingModalModel';
import './settingModalStyle.css';

function SettingModalComponent(props: { settings: SettingItem, selectedIdx: number, onSaveClicked: Function }) {
    const settingModalModel = new SettingModalModel(props.settings, props.selectedIdx);

    // states
    const [selectedIdx, setSelectedIdx]: [number, Function] = useState(settingModalModel.selectedIdx);

    return (
        <div className="setting-modal">
            <div className="setting-modal__modal">
                <div className="setting-modal__content">
                    <div className="setting-modal__title">{ settingModalModel.title }</div>
                    { settingModalModel.options.map((option: string, idx: number) =>
                        <div key={ idx }>
                            <input type="radio" checked={ selectedIdx === idx } onChange={() => setSelectedIdx(idx)} />
                            <div className="setting-modal__option" onClick={() => setSelectedIdx(idx)}>{ option }</div>
                        </div>
                    )}
                </div>
                <div className="setting-modal__save" onClick={() => props.onSaveClicked(selectedIdx)}>Save</div>
            </div>
        </div>
    );
}

export default SettingModalComponent;
