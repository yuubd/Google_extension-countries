import React from "react";
import "./pageHeaderStyle.css";
import { PageHeaderModel } from "./pageHeaderModel";

function PageHeaderComponent(props: { title: string, onGoBackClicked: Function }) {
    const pageHeaderModel = new PageHeaderModel(props.title, props.onGoBackClicked);

    return (
        <div className="page-header">
            <i className="reply default icon page-header__icon" onClick={() => pageHeaderModel.onGoBackClicked()} />
            <div>{ pageHeaderModel.title }</div>
        </div>
    );
}

export default PageHeaderComponent;