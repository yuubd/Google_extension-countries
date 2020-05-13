import React, { useState } from 'react';
import './infoRow.css';
import url from '../resources/continent.png';


type Row = {
  title: string,
  value: string
}

function InfoRow(props: Row) {
    return (
        <div className="infoRow" >
            <div className="icon-title">
              <img className="icon-img" src={url} alt="icon"/>
              <div className="title">{props.title}</div>
            </div>
            <div className="value">{props.value}</div>
        </div>
    );
}

export default InfoRow;
