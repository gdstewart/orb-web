import React, { Component } from "react";
import Link from "next/link";
import Moment from "moment-timezone";

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: Moment().format("MMMM D YYYY"),
            currentTime: Moment().format("h:mm:ssa z"),
            currentTimezone: Moment.tz(Moment.tz.guess()).zoneAbbr()
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            currentDate: Moment().format("MMMM D YYYY"),
            currentTime: Moment().format("h:mm:ssa z"),
            currentTimezone: Moment.tz(Moment.tz.guess()).zoneAbbr()
        }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <nav className="nav">
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link
                            href="/">
                            <div className="nav-link-logo fade-in hover-fade" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/">
                            <a className="nav-link hover-fade">Stations</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/schedules">
                            <a className="nav-link hover-fade">Schedules</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href="/about">
                            <a className="nav-link hover-fade">About</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <div className="nav-text">{this.state.currentDate + " " + this.state.currentTime + " " + this.state.currentTimezone}</div>
                    </li>
                </ul>
            </nav>
        )
    }
}