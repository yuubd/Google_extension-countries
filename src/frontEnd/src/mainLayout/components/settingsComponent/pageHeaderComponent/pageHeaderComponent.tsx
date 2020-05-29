import React from "react";

import { PageHeaderModel } from "./pageHeaderModel";
import "./pageHeaderStyle.css";

function PageHeaderComponent(props: { title: string, onGoBackClicked: Function }) {
    const pageHeaderModel = new PageHeaderModel(props.title);

    return (
        <div className="page-header">
            <i className="reply default icon page-header__icon" onClick={() => props.onGoBackClicked()} />
            <div>{ pageHeaderModel.title }</div>
        </div>
    );
}

export default PageHeaderComponent;
