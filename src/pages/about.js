import React, { Component } from "react";
import AppStore from "../stores/app";
import { IoLogoTwitter, IoLogoGithub, IoMdGlobe } from "react-icons/io";
import { FaGooglePlay } from "react-icons/fa";

export default class About extends Component {
    componentDidMount() {
        AppStore.loading = false;
        AppStore.currentPage = "about";
    }

    render() {
        return (
            <div className="section column fade-in">
                <div className="about-info">
                    <div className="about-info-header">
                        orb: online radio broadcaster v1.1
                    </div>
                    <div className="about-info-special">
                        <a className="about-info-special-link-text hover-fade-alpha" href={"https://play.google.com/store/apps/details?id=com.orbmobile"} target="_blank" rel="noopener noreferrer"><i>Now available on Android!</i></a>
                    </div>
                    <div className="about-info-blurb">
                        orb is a handy tool that aggregates various online, non-terrestrial radio stations on a single site.
                    </div>
                    <div className="about-info-blurb">
                        Data is pulled from public APIs exposed by the various broadcasting softwares that these stations use. As a result, orb only uses radio stations where current stream information could be easily accessed.
                    </div>
                    <div className="about-info-blurb">
                        So far the implementation is pretty minimal but someday I'd like to set up notifications so that you can save your favourite shows and be alerted to when they are being broadcasted.
                    </div>
                    <div className="about-info-blurb">
                        You can visit me around the web at the links below:
                    </div>
                    <ul className="about-info-links">
                        <li key={"website"} className="about-info-link">
                            <IoMdGlobe className="about-info-link-icon" />
                            <a className="about-info-link-text hover-fade-alpha" href={"https://graemestew.art/"} target="_blank" rel="noopener noreferrer">graemestew.art/</a>
                        </li>
                        <li key={"github"} className="about-info-link">
                            <IoLogoGithub className="about-info-link-icon" />
                            <a className="about-info-link-text hover-fade-alpha" href={"https://github.com/gdstewart/"} target="_blank" rel="noopener noreferrer">github.com/gdstewart/</a>
                        </li>
                        <li key={"twitter"} className="about-info-link">
                            <IoLogoTwitter className="about-info-link-icon" />
                            <a className="about-info-link-text hover-fade-alpha" href={"https://twitter.com/graemedstewart"} target="_blank" rel="noopener noreferrer">@graemedstewart</a>
                        </li>
                        <li key={"googleplay"} className="about-info-link">
                            <FaGooglePlay className="about-info-link-icon" />
                            <a className="about-info-link-text hover-fade-alpha" href={"https://play.google.com/store/apps/details?id=com.orbmobile"} target="_blank" rel="noopener noreferrer">Android version</a>
                        </li>
                    </ul>
                    <img className="about-info-image" src="/images/misc/isono.jpg" alt="&copy; Hiroo Isono" />
                    <div className="about-info-image-credits">
                        &copy; Hiroo Isono
                    </div>
                </div>
            </div>
        )
    }
}