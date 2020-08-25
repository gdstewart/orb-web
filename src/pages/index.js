import React, { Component } from "react";
import { observer } from "mobx-react";
import StationStore from "../stores/station";
import PlaybackStore from "../stores/playback";
import AppStore from "../stores/app";
import StationsData from "../../res/stations-data";
import getCurrentShowInfo from "../utils/show-fetcher";
import Loader from "react-loader-spinner";
import { FaStop, FaPlay } from "react-icons/fa";
import Link from "next/link";

@observer
class StationsList extends Component {
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
			logoHoverState: " hover-fade-opacity-hidden",
			clickFadeState: " fade-in"
		};
	}

	_refreshShows() {
		Object.keys(StationStore.shows).forEach(station => {
			Promise.resolve(getCurrentShowInfo(station, 0)).then(show => {
				StationStore.shows[station].currentShow = show.title;
				StationStore.shows[station].time = show.time;
				StationStore.shows[station].loading = false;
				if (PlaybackStore.playbackInfo.station === station)
					PlaybackStore.playbackInfo.currentShow = show.title;
			});
		})
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		document.documentElement.style.setProperty("--theme-color", "#000");
		AppStore.loading = false;
		AppStore.currentPage = "stations";
		this._refreshShows();
		this.interval = setInterval(() => {
			this._refreshShows();
		}, 60000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		let list = StationStore.stations.map((station) => {
			if (station.name === "NTS 1") {
				return (
					<li key={station.name} className={StationStore.shows[station.name].currentShow !== "Offline" ? "stations-list-item white-border" : "stations-list-item white-border disabled"}>
						<div className="stations-list-item-logo white-border"
							onMouseLeave={() => {
								if (StationStore.shows[station.name].currentShow !== "Offline") {
									this.setState({
										logoHoverState: " hover-fade-opacity-hidden"
									});
								}
							}}
							onClick={() => {
								if (!StationStore.shows["NTS 1"].loading && !StationStore.shows["NTS 2"].loading && StationStore.shows["NTS 1"].currentShow !== "Offline" && StationStore.shows["NTS 2"].currentShow !== "Offline") {
									if ((PlaybackStore.playbackInfo.station === "NTS 1" || PlaybackStore.playbackInfo.station === "NTS 2") && PlaybackStore.playing) {
										PlaybackStore.playing = false;
										this.setState({
											logoHoverState: ""
										})
									} else {
										this.setState({
											clickFadeState: ""
										})
										AppStore.showPopUp = true;
									}
								}
							}}>
							{!StationStore.shows["NTS 1"].loading && !StationStore.shows["NTS 2"].loading && StationStore.shows["NTS 1"].currentShow !== "Offline" && StationStore.shows["NTS 2"].currentShow !== "Offline" ? ((PlaybackStore.playbackInfo.station === "NTS 1" || PlaybackStore.playbackInfo.station === "NTS 2") && PlaybackStore.playing ? <FaStop className="stations-list-item-logo-stop-icon" /> : <FaPlay className={"stations-list-item-logo-play-icon" + this.state.logoHoverState} />) : null}
							<img className="stations-list-item-logo-image" src={station.image} alt={"NTS"} />
						</div>
						{!StationStore.shows[station.name].loading ?
							<div className="stations-list-item-body">
								{(PlaybackStore.playbackInfo.station === "NTS 1") && PlaybackStore.playing
									?
									<div className="column">
										<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
											<div className="hover-fade-alpha" onClick={() => {
												AppStore.loading = true;
											}}>
												<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{"1: " + StationStore.shows["NTS 1"].currentShow}</div>
												<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows["NTS 1"].time}</div>
											</div>
										</Link>
										<div className="hover-fade-alpha" onClick={() => {
											this.setState({
												clickFadeState: ""
											})
											PlaybackStore.playing = false;
											setTimeout(() => {
												PlaybackStore.playbackInfo = {
													station: "NTS 2",
													currentShow: StationStore.shows["NTS 2"].currentShow,
													image: StationStore.stations.filter((station) => station.name === "NTS 2")[0].image,
													streamUrl: StationStore.stations.filter((station) => station.name === "NTS 2")[0].streamUrl
												};
												if (!PlaybackStore.playerLoaded)
													PlaybackStore.playerLoaded = true;
												PlaybackStore.playing = true;
											}, 100);
										}}>
											<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{"2: " + StationStore.shows["NTS 2"].currentShow}</div>
											<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows["NTS 2"].time}</div>
										</div>
									</div>
									:
									<div className="column">
										<div className="hover-fade-alpha" onClick={() => {
											this.setState({
												clickFadeState: ""
											})
											PlaybackStore.playing = false;
											setTimeout(() => {
												PlaybackStore.playbackInfo = {
													station: "NTS 1",
													currentShow: StationStore.shows["NTS 1"].currentShow,
													image: StationStore.stations.filter((station) => station.name === "NTS 1")[0].image,
													streamUrl: StationStore.stations.filter((station) => station.name === "NTS 1")[0].streamUrl
												};
												if (!PlaybackStore.playerLoaded)
													PlaybackStore.playerLoaded = true;
												PlaybackStore.playing = true;
											}, 100);
										}}>
											<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{"1: " + StationStore.shows["NTS 1"].currentShow}</div>
											<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows["NTS 1"].time}</div>
										</div>
										<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
											<div className="hover-fade-alpha" onClick={() => {
												AppStore.loading = true;
											}}>
												<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{"2: " + StationStore.shows["NTS 2"].currentShow}</div>
												<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows["NTS 2"].time}</div>
											</div>
										</Link>
									</div>
								}
								<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
									<div className="hover-fade-alpha stations-list-item-station-name" onClick={() => {
										AppStore.loading = true;
									}}>
										{"NTS"}
									</div>
								</Link>
							</div> :
							<div className="stations-list-item-body">
								<Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />
								<div className="stations-list-item-time">&nbsp;</div>
								<Loader className="stations-list-item-show-title fade-in" type="ThreeDots" color="#FFF" height={20} width={20} />
								<div className="stations-list-item-time">&nbsp;</div>
								<div className="stations-list-item-station-name">{"NTS"}</div>
							</div>}
					</li>
				);
			} else if (station.name !== "NTS 2") {
				return (
					<li key={station.name} className={StationStore.shows[station.name].currentShow !== "Offline" ? "stations-list-item white-border" : "stations-list-item white-border disabled"}>
						<div className="stations-list-item-logo white-border"
							onMouseLeave={() => {
								if (StationStore.shows[station.name].currentShow !== "Offline") {
									this.setState({
										logoHoverState: " hover-fade-opacity-hidden"
									});
								}
							}}
							onClick={() => {
								if (!StationStore.shows[station.name].loading && StationStore.shows[station.name].currentShow !== "Offline") {
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
									this.setState({
										clickFadeState: ""
									})
								}
							}}>
							{!StationStore.shows[station.name].loading && StationStore.shows[station.name].currentShow !== "Offline" ? (PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing ? <FaStop className="stations-list-item-logo-stop-icon" /> : <FaPlay className={"stations-list-item-logo-play-icon" + this.state.logoHoverState} />) : null}
							<img className="stations-list-item-logo-image" src={station.image} alt={station.name} />
						</div>
						{!StationStore.shows[station.name].loading ?
							<div className="stations-list-item-body">
								{PlaybackStore.playbackInfo.station === station.name && PlaybackStore.playing
									?
									<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
										<div className="hover-fade-alpha" onClick={() => {
											AppStore.loading = true;
										}}>
											<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{StationStore.shows[station.name].currentShow}</div>
											<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows[station.name].time}</div>
										</div>
									</Link>
									:
									<div className="hover-fade-alpha" onClick={() => {
										this.setState({
											clickFadeState: ""
										})
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
									}}>
										<div className={"stations-list-item-show-title" + this.state.clickFadeState}>{StationStore.shows[station.name].currentShow}</div>
										<div className={"stations-list-item-time" + this.state.clickFadeState}>{StationStore.shows[station.name].time}</div>
									</div>
								}
								<Link as={"/"} href={{ pathname: "/station", query: { name: station.name } }}>
									<div className="hover-fade-alpha stations-list-item-station-name" onClick={() => {
										AppStore.loading = true;
									}}>
										{station.name}
									</div>
								</Link>
							</div> :
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

@observer
export default class Stations extends Component {
	render() {
		return (
			<div className="section zero-margin column fade-in">
				<StationsList />
			</div>
		)
	}
}