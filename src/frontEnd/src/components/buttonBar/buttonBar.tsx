import React, { useState } from 'react';
import './buttonBar.css';

type ButtonBarProps = {
    currPage: string,
    setCurrPage: Function,
    onClickPrev: Function,
    onClickNext: Function,
}

function ButtonBar(props: ButtonBarProps) {

    // states
    const [isBookmarked, setBookmarked]: [boolean, any] = useState(false);

    function toggleBookmarked(): void {
        // temporary behaviour: just toggles the icon
        setBookmarked(!isBookmarked);
    }

    function getBookmarkIcon(): JSX.Element {
        if (isBookmarked) {
            return (<i className="bookmark large icon" />);
        } else {
            return (<i className="bookmark outline large icon" />);
        }
    }

    return (
        <div className="button-bar">
            <div className="button-bar__section right-border">
                <div className="button-bar__button" onClick={() => ((props.currPage === "settings") ? props.setCurrPage("") : props.setCurrPage("settings"))}>
                    <i className="setting large icon" />
                </div>
                <div className="button-bar__button" onClick={() => toggleBookmarked()}>
                    { getBookmarkIcon() }
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
