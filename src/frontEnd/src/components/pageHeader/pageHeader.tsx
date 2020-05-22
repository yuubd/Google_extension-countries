import React from 'react';
import './pageHeader.css';

function PageHeader(props: { title: string, onGoBackClicked: Function }) {

    return (
        <div className="page-header">
            <i className="reply default icon page-header__icon" onClick={() => props.onGoBackClicked()} />
            <div>{ props.title }</div>
        </div>
    );
}

export default PageHeader;