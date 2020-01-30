import React, { Component } from "react";
import { observer } from "mobx-react";
import StationStore from "../stores/station";
import StationsData from "../data/stationsdata";
import ShowFetcher from "../utils/showfetcher";
import Loader from "react-loader-spinner";
import Moment from "moment-timezone";

@observer
export default class StationsList extends Component {
	constructor(props) {
		super(props);

		StationStore.stations = StationsData.sort(function (a, b) {
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		});
		let data = StationStore.stations.map(station => {
			return {
				key: station.name, value: {
					name: station.name,
					loading: true,
					currentShow: "",
					time: ""
				}
			};
		});

		let temp = {};
		for (var i = 0; i < data.length; i++) {
			temp[data[i].key] = data[i].value;
		}

		this.state = {
			shows: temp,
			localTimezone: Moment.tz(Moment.tz.guess()).zoneAbbr()
		};
	}

	componentDidMount() {
		Object.keys(this.state.shows).forEach(station => {
			Promise.resolve(ShowFetcher(station, 0)).then(show => {
				this.setState(prevState => ({
					shows: {
						...prevState.shows,
						[station]: {
							...prevState.shows[station],
							currentShow: show.title,
							time: show.time,
							loading: false
						}
					}
				}))
			});
		});

	}

	componentWillUnmount() {
	}

	render() {
		var list = StationStore.stations.map((station) => {
			if (station.name === "NTS 1") {
				return (
					<li key={station.name} className="stations-list-item white-border fade-in">
						<img className="stations-list-item-logo white-border" src={station.image} />
						<div className="stations-list-item-body">
							{!this.state.shows["NTS 1"].loading
								? <div className="stations-list-item-show-title fade-in">{"1: " + this.state.shows["NTS 1"].currentShow}</div>
								: <Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />}
							{!this.state.shows["NTS 1"].loading
								? <div className="stations-list-item-time fade-in">{this.state.shows["NTS 1"].time}</div>
								: <div className="stations-list-item-time">&nbsp;</div>}
							{!this.state.shows["NTS 2"].loading
								? <div className="stations-list-item-show-title fade-in">{"2: " + this.state.shows["NTS 2"].currentShow}</div>
								: <Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />}
							{!this.state.shows["NTS 2"].loading
								? <div className="stations-list-item-time fade-in">{this.state.shows["NTS 2"].time}</div>
								: <div className="stations-list-item-time">&nbsp;</div>}
							<div className="stations-list-item-station-name">{"NTS"}</div>
						</div>
					</li>
				);
			} else if (station.name !== "NTS 2") {
				return (
					<li key={station.name} className="stations-list-item white-border fade-in">
						<img className="stations-list-item-logo white-border" src={station.image} />
						<div className="stations-list-item-body">
							{!this.state.shows[station.name].loading
								? <div className="stations-list-item-show-title fade-in">{this.state.shows[station.name].currentShow}</div>
								: <Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />}
							{!this.state.shows[station.name].loading
								? <div className="stations-list-item-time fade-in">{this.state.shows[station.name].time}</div>
								: ""}
							<div className="stations-list-item-station-name">{station.name}</div>
						</div>
					</li>
				);
			}
		});
		return (
			<ul className="stations-list">{list}</ul>
		)

	}
}