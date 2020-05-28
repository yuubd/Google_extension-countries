import React from 'react';
import './settingModalStyle.css';
import { SettingModalModel } from './settingModalModel';

type SettingModalProps = {
    title: string,
    options: string[],
    selected: string,
    onOptionChanged: Function,
    onSaveClicked: Function
}

function SettingModalComponent(props: SettingModalProps) {
    const settingModalModel = new SettingModalModel(props.title, props.options, props.selected);

    return (
        <div className="setting-modal">
            <div className="setting-modal__modal">
                <div>
                    <div className="setting-modal__title">{ settingModalModel.title }</div>
                    { settingModalModel.options.map((option: string, idx: number) =>
                        <div key={ idx }>
                        <input
                            type="radio"
                            value={ idx }
                            checked={settingModalModel.selected === option}
                            onChange={() => props.onOptionChanged(idx)}
                        />
                        <div className="setting-modal__option" onClick={() => props.onOptionChanged(idx)}>
                            { option }
                        </div>
                    </div>
                    )}
                </div>
                <div className="setting-modal__close" onClick={() => props.onSaveClicked()}>Save</div>
            </div>
        </div>
    );
}

export default SettingModalComponent;