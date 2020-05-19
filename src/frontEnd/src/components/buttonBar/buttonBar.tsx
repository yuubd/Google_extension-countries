import React from 'react';
import './buttonBar.css';
import { Button } from 'semantic-ui-react'

function ButtonBar(props: { onClickPrev: Function, onClickNext: Function }) {

    return (
        <div className="button-bar">
            <Button icon='left arrow' labelPosition='left' onClick={() => props.onClickPrev()} />
            <Button icon='right arrow' labelPosition='right' onClick={() => props.onClickNext()} />
        </div>
    );
}

export default ButtonBar;
