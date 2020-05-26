import React from 'react';

import { ButtonBarModel } from './buttonBarModel';
import './buttonBarStyle.css';

function ButtonBarComponent(props: { onClickPrev: Function, onClickNext: Function, isDarkTheme: boolean, setDarkTheme: Function }) {
    const buttonBarModel = new ButtonBarModel(props.onClickPrev, props.onClickNext, props.isDarkTheme, props.setDarkTheme);

    return (
        <div className="button-bar">
            <div className="button-bar__button button-bar__button--settings" onClick={() => buttonBarModel.onSettingsClicked()}>
                <i className="setting large icon" />
            </div>
            <div className="button-bar__button button-bar__button--center" onClick={() => buttonBarModel.onClickPrev()}>
                <i className="reply large icon" />
            </div>
            <div className="button-bar__button" onClick={() => buttonBarModel.onClickNext()}>
                <i className="share large icon" />
            </div>
        </div>
    );
}

export default ButtonBarComponent;