import React, { Component } from "react";
import { observer } from "mobx-react";
import Select from "react-select";
import AppStore from "../stores/app";
import StationStore from "../stores/station";
import ScheduleStore from "../stores/schedule";
import Moment from "moment-timezone";
import getCurrentSchedule from "../utils/schedule-fetcher";

const dropdownStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected || state.isFocused ? "black" : "white",
        backgroundColor: state.isSelected || state.isFocused ? "white" : "black",
        cursor: state.isFocused ? "pointer" : "default",
    })
}

@observer
class ScheduleSelector extends Component {
    constructor(props) {
        super(props);

        let stations = StationStore.stations.map((station, index) => {
            return {
                value: index,
                label: station.name
            }
        });

        let days = [
            { value: 0, label: Moment().add(0, "days").format("dddd, MMMM D") },
            { value: 1, label: Moment().add(1, "days").format("dddd, MMMM D") },
            { value: 2, label: Moment().add(2, "days").format("dddd, MMMM D") },
            { value: 3, label: Moment().add(3, "days").format("dddd, MMMM D") },
            { value: 4, label: Moment().add(4, "days").format("dddd, MMMM D") },
            { value: 5, label: Moment().add(5, "days").format("dddd, MMMM D") },
            { value: 6, label: Moment().add(6, "days").format("dddd, MMMM D") },
        ];

        this.state = {
            stationOptions: stations,
            dayOptions: days,
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        AppStore.loading = false;
        AppStore.currentPage = "schedules";

        this._setDay(this.state.dayOptions[0]);
        if (ScheduleStore.currentStation)
            this._setStation(this.state.stationOptions[ScheduleStore.currentStation]);

        /*this._refreshShows();
        this.interval = setInterval(() => {
            this._refreshShows();
        }, 60000);*/
    }

    _setStation = async (station) => {
        ScheduleStore.currentSchedule = null;
        AppStore.loading = true;
        ScheduleStore.currentStation = station.value;
        let schedule = await getCurrentSchedule(station.label);
        ScheduleStore.currentSchedule = schedule;
        console.log(schedule);
        setTimeout(() => AppStore.loading = false, 100);
    }

    _setDay = (day) => {
        console.log(day)
        AppStore.loading = true;
        ScheduleStore.currentDay = day.value;
        setTimeout(() => AppStore.loading = false, 100);
    }

    componentWillUnmount() {
        ScheduleStore.currentSchedule = null;
    }

    render() {
        return (
            <div className="schedule-sidebar">
                <Select
                    className="schedule-dropdown"
                    classNamePrefix="schedule-dropdown"
                    styles={dropdownStyles}
                    value={this.state.stationOptions[ScheduleStore.currentStation]}
                    placeholder="Select station..."
                    onChange={this._setStation}
                    options={this.state.stationOptions} />
                <Select
                    className="schedule-dropdown"
                    classNamePrefix="schedule-dropdown"
                    styles={dropdownStyles}
                    value={this.state.dayOptions[ScheduleStore.currentDay]}
                    placeholder="Select day..."
                    onChange={this._setDay}
                    options={this.state.dayOptions} />
                <div className="schedule-note">{"All times " + Moment.tz(Moment.tz.guess()).zoneAbbr()}</div>
            </div>
        )
    }
}

@observer
class ScheduleList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (ScheduleStore.currentSchedule) {
            if (typeof ScheduleStore.currentSchedule === "string") {
                return (
                    <div className="schedule-list-container fade-in">
                        <ul className="schedule-list">
                            <li className="schedule-list-item light-background">
                                <a className="schedule-list-item-link-text hover-fade-alpha" href={ScheduleStore.currentSchedule} target="_blank" rel="noopener noreferrer">
                                    {"Unable to obtain the schedule. Click to visit the " + StationStore.stations[ScheduleStore.currentStation].name + " website."}
                                </a>
                            </li>
                        </ul>
                    </div>
                )
            } else {
                let list = Array.from(ScheduleStore.currentSchedule[ScheduleStore.currentDay]);
                return (
                    <div className="schedule-list-container fade-in">
                        <ul className="schedule-list">
                            {list.map((listing, index) => {
                                return (
                                    <li className={"schedule-list-item" + ((index + 1) % 2 ? " light-background" : "")}>
                                        <div>{listing.substr(listing.indexOf(' ') + 1)}</div>
                                        <div>{listing.substr(0, listing.indexOf(' '))}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            }
        } else return null;

    }
}

export default class Schedules extends Component {
    render() {
        return (
            <div className="section fade-in column">
                <div className="schedule-view">
                    <ScheduleSelector />
                    <ScheduleList />
                </div>
            </div>
        )
    }
}