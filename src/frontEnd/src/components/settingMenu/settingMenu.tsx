import React from 'react';
import './settingMenu.css';

function SettingMenu(props: { title: string, description: string, onSettingClick?: Function }) {

    return (
        <div
            className={`setting-menu ${props.onSettingClick !== undefined ? "setting-menu--clickable" : ""}`}
            onClick={() => (props.onSettingClick !== undefined ? props.onSettingClick() : "")}
        >
            <div className="setting-menu__title">{ props.title }</div>
            <div className="setting-menu__description">{ props.description }</div>
        </div>
    );
}

export default SettingMenu;