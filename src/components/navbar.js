import React, { Component } from "react";
import AppStore from "../stores/app";
import Link from "next/link";
import Moment from "moment-timezone";

var index = 0;

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: Moment().format("MMMM D YYYY"),
            currentTime: Moment().format("h:mma z"),
            currentTimezone: Moment.tz(Moment.tz.guess()).zoneAbbr()
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            currentDate: Moment().format("MMMM D YYYY"),
            currentTime: Moment().format("h:mma z"),
            currentTimezone: Moment.tz(Moment.tz.guess()).zoneAbbr()
        }), 1000);
    }

    _changeTheme() {
        if (++index === AppStore.themeColors.length) index = 0;
        AppStore.selectedThemeColor = AppStore.themeColors[index];
        document.documentElement.style.setProperty("--theme-color", AppStore.selectedThemeColor);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <nav className="nav" onClick={() => {
                AppStore.showPopUp = false;
            }}>
                <ul className="nav-items">
                    <li className="nav-item">
                        <div className="nav-link-logo fade-in hover-fade-opacity" onClick={this._changeTheme} />
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/">
                            <a className="nav-link hover-fade-alpha" onClick={() => {
                                if (AppStore.currentPage !== "stations")
                                    AppStore.loading = true;
                            }}>Stations</a>
                        </Link>
                    </li>
                    {<li className="nav-item">
                        <Link
                            as={"/"} href="/schedules">
                            <a className="nav-link hover-fade-alpha" onClick={() => {
                                if (AppStore.currentPage !== "schedules")
                                    AppStore.loading = true;
                            }}>Schedules</a>
                        </Link>
                    </li>}
                    <li className="nav-item">
                        <Link
                            as={"/"} href="/about">
                            <a className="nav-link hover-fade-alpha" onClick={() => {
                                if (AppStore.currentPage !== "about")
                                    AppStore.loading = true;
                            }}>About</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-date">{this.state.currentDate + " " + this.state.currentTime + " " + this.state.currentTimezone}</div>
                    </li>
                </ul>
            </nav>
        )
    }
}