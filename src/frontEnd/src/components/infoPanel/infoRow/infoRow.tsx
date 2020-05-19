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
    return (
        <div className="infoRow" >
            <div className="icon-title">
              <img className="icon-img" src={getIconFromTitle(props.title)} alt="icon"/>
              <div className="title">{props.title}</div>
            </div>
            <div className="value">{props.value}</div>
        </div>
    );
}

export default InfoRow;
