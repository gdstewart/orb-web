import React, { Component } from "react";
import { observer } from "mobx-react";
import StationStore from "../stores/station";
import PlaybackStore from "../stores/playback";
import StationsData from "../data/stationsdata";
import ShowFetcher from "../utils/showfetcher";
import Loader from "react-loader-spinner";
import Moment from "moment-timezone";
import { FaStop, FaPlay } from "react-icons/fa";
import Link from "next/link";

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

		StationStore.shows = temp;

		this.state = {
			inactiveState: " stations-list-item-logo-inactive",
			logoHoverState: " hover-fade-opacity-hidden"
		};
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.interval = setInterval(() => {
			Object.keys(StationStore.shows).forEach(station => {
				Promise.resolve(ShowFetcher(station, 0)).then(show => {
					this.setState({ inactiveState: "" });
					StationStore.shows[station].currentShow = show.title;
					StationStore.shows[station].time = show.time;
					StationStore.shows[station].loading = false;
				});
			})
		}, 6000);

	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		var list = StationStore.stations.map((station) => {
			if (station.name === "NTS 1") {
				return (
					<li key={station.name} className="stations-list-item white-border fade-in">
						<div className="stations-list-item-logo white-border"
							onMouseLeave={() => {
								this.setState({
									logoHoverState: " hover-fade-opacity-hidden"
								});
							}}
							onClick={() => {
								if (!StationStore.shows[station.name].loading) {
									if (PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing) {
										PlaybackStore.playing = false;
										this.setState({
											logoHoverState: ""
										})
									} else {
										PlaybackStore.playing = false;
										setTimeout(() => {
											PlaybackStore.playbackInfo = {
												station: station.name,
												currentShow: StationStore.shows[station.name].currentShow,
												image: station.image,
												streamUrl: station.streamUrl
											};
											if (!PlaybackStore.playerLoaded)
												PlaybackStore.playerLoaded = true;
											PlaybackStore.playing = true;
										}, 100);
									}
								}
							}}>
							{PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing ? <FaStop className="stations-list-item-logo-stop-icon" /> : <FaPlay className={"stations-list-item-logo-play-icon" + this.state.logoHoverState + this.state.inactiveState} />}
							<img className="stations-list-item-logo-image" src={station.image} />
						</div>
						<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
							<div className="stations-list-item-body hover-fade-alpha">
								{!StationStore.shows["NTS 1"].loading
									? <div className="stations-list-item-show-title fade-in">{"1: " + StationStore.shows["NTS 1"].currentShow}</div>
									: <Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />}
								{!StationStore.shows["NTS 1"].loading
									? <div className="stations-list-item-time fade-in">{StationStore.shows["NTS 1"].time}</div>
									: <div className="stations-list-item-time">&nbsp;</div>}
								{!StationStore.shows["NTS 2"].loading
									? <div className="stations-list-item-show-title fade-in">{"2: " + StationStore.shows["NTS 2"].currentShow}</div>
									: <Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />}
								{!StationStore.shows["NTS 2"].loading
									? <div className="stations-list-item-time fade-in">{StationStore.shows["NTS 2"].time}</div>
									: <div className="stations-list-item-time">&nbsp;</div>}
								<div className="stations-list-item-station-name">{"NTS"}</div>
							</div>
						</Link>
					</li>
				);
			} else if (station.name !== "NTS 2") {
				return (
					<li key={station.name} className="stations-list-item white-border fade-in">
						<div className="stations-list-item-logo white-border"
							onMouseLeave={() => {
								this.setState({
									logoHoverState: " hover-fade-opacity-hidden"
								});
							}}
							onClick={() => {
								if (!StationStore.shows[station.name].loading) {
									if (PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing) {
										PlaybackStore.playing = false;
										this.setState({
											logoHoverState: ""
										})
									} else {
										PlaybackStore.playing = false;
										setTimeout(() => {
											PlaybackStore.playbackInfo = {
												station: station.name,
												currentShow: StationStore.shows[station.name].currentShow,
												image: station.image,
												streamUrl: station.streamUrl
											};
											if (!PlaybackStore.playerLoaded)
												PlaybackStore.playerLoaded = true;
											PlaybackStore.playing = true;
										}, 100);
									}
								}
							}}>
							{PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing ? <FaStop className="stations-list-item-logo-stop-icon" /> : <FaPlay className={"stations-list-item-logo-play-icon" + this.state.logoHoverState + this.state.inactiveState} />}
							<img className="stations-list-item-logo-image" src={station.image} />
						</div>
						{!StationStore.shows[station.name].loading ?
							<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
								<div className="stations-list-item-body hover-fade-alpha">
									<div className="stations-list-item-show-title fade-in">{StationStore.shows[station.name].currentShow}</div>
									<div className="stations-list-item-time fade-in">{StationStore.shows[station.name].time}</div>
									<div className="stations-list-item-station-name">{station.name}</div>
								</div>
							</Link> :
							<div className="stations-list-item-body">
								<Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />
								<div className="stations-list-item-station-name">{station.name}</div>
							</div>}
					</li>
				);
			}
		});
		return (
			<ul className="stations-list">{list}</ul>
		)

	}
}