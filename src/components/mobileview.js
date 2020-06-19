import React, { Component } from "react";
import { FaGooglePlay } from "react-icons/fa";

export default class MobileView extends Component {
    render() {
        return (
            <div className="mobile-view">
                <div className="mobile-view-logo" />
                <div className="mobile-view-header">Sorry!</div>
                <div className="mobile-view-blurb">orb is only available on desktop, tablets, and the Google Play store.</div>
                <div className="mobile-view-blurb">Download here:</div>
                <ul className="mobile-view-links">
                    <li key={"googleplay"} className="mobile-view-link">
                        <FaGooglePlay className="mobile-view-link-icon" />
                        <a className="mobile-view-link-text" href={"https://play.google.com/store/apps/details?id=com.orbmobile"} target="_blank" rel="noopener noreferrer">Android version</a>
                    </li>
                </ul>
            </div>
        )
    }
}