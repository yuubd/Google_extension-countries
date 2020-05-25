import React from "react";

import { InfoRowModel } from './infoRowModel';
import "./infoRowStyle.css";

function InfoRowComponent(props: { title: string, value: string }) {

    const infoRowModel = new InfoRowModel(props.title, props.value);
    return (
        <div className="infoRow" >
            <div className="icon-title">
                <img className="icon-img" src={infoRowModel.iconSrc} alt="icon" />
                <div className="title">{props.title}</div>
            </div>
            <div className={infoRowModel.valueClass}>{infoRowModel.value}</div>
        </div>
    );
}

export default InfoRowComponent;
