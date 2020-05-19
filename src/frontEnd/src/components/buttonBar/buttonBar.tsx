import React from 'react';
import './buttonBar.css';
import { Button } from 'semantic-ui-react'

function ButtonBar(props: { onClickPrev: Function, onClickNext: Function }) {

    return (
        <div className="button-bar">
            <div className="button-bar__section right-border">
                <div className="button-bar__button">
                    <i className="setting large icon" />
                </div>
                <div className="button-bar__button">
                    <i className="bookmark outline large icon" />
                </div>
                <div className="button-bar__button">
                    <i className="ellipsis horizontal large icon" />
                </div>
            </div>
            <div className="button-bar__section left-border">
                <div className="button-bar__button right-border" onClick={() => props.onClickPrev()}>
                    <i className="reply large icon" />
                </div>
                <div className="button-bar__button left-border" onClick={() => props.onClickNext()}>
                    <i className="share large icon" />
                </div>
            </div>
        </div>
    );
}

export default ButtonBar;
