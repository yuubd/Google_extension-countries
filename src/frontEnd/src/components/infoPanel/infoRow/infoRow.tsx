import React, { useState } from 'react';
import './infoRow.css';

type Row = {
    title: string,
    value: string
}

function InfoRow(props: Row) {
    function getIconFromTitle(title: string): string {
        let name: string = title.substring(0, 4).toLowerCase(); // icon name uses first 4 letters
        return require(`../resources/icon_${name}.png`);
    }
    function getValueElement(value: string): JSX.Element {
        if (value.length < 32) {
            return (<div className="value">{props.value}</div>);
        } else {
            return (<div className="value very-long-value">{props.value}</div>);
        }
    }
    return (
        <div className="infoRow" >
            <div className="icon-title">
                <img className="icon-img" src={getIconFromTitle(props.title)} alt="icon"/>
                <div className="title">{props.title}</div>
            </div>
            { getValueElement(props.value) }
        </div>
    );
}

export default InfoRow;
