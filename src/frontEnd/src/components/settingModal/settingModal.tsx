import React from 'react';
import './settingModal.css';

type SettingModalProps = {
    title: string,
    options: string[],
    selected: string,
    onOptionChanged: Function,
    onCloseClicked: Function
}

function SettingModal(props: SettingModalProps) {

    function renderSettingOptions(): JSX.Element[] {
        let elements: JSX.Element[] = [];
        for (let optionIdx in props.options) {
            elements.push(
                <div key={ optionIdx }>
                    <input
                        type="radio"
                        value={ optionIdx }
                        checked={props.selected === props.options[optionIdx]}
                        onChange={() => props.onOptionChanged(optionIdx)}
                    />
                    <div className="setting-modal__option" onClick={() => props.onOptionChanged(optionIdx)}>
                        { props.options[optionIdx] }
                    </div>
                </div>
            );
        }
        return elements;
    }

    return (
        <div className="setting-modal">
            <div>
                <div className="setting-modal__title">{ props.title }</div>
                { renderSettingOptions() }
            </div>
            <div className="setting-modal__close" onClick={() => props.onCloseClicked()}>Close</div>
        </div>
    );
}

export default SettingModal;