import React, { Component } from "react";
import StationStore from "../stores/station";
import PlaybackStore from "../stores/playback";
import AppStore from "../stores/app";
import StationsData from "../../res/stations-data";
import getCurrentShowInfo from "../utils/show-fetcher";
import { IoLogoTwitter, IoLogoInstagram, IoLogoFacebook, IoMdGlobe, IoMdArrowBack } from "react-icons/io";
import { FaStop, FaPlay } from "react-icons/fa";
import { observer } from "mobx-react";
import Link from "next/link";

class SocialBar extends Component {
    render() {
        var list = [];
        if (this.props.station.websiteUrl != null) {
            list.push(
                <li key={"website"} className="station-info-social-bar-item hover-fade-opacity">
                    <a className="station-info-social-bar-item-text" href={this.props.station.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <IoMdGlobe />
                    </a>
                </li>
            );
        }
        if (this.props.station.instagramUrl != null) {
            list.push(
                <li key={"instagram"} className="station-info-social-bar-item hover-fade-opacity">
                    <a className="station-info-social-bar-item-text" href={this.props.station.instagramUrl} target="_blank" rel="noopener noreferrer">
                        <IoLogoInstagram />
                    </a>
                </li>
            );
        }
        if (this.props.station.twitterUrl != null) {
            list.push(
                <li key={"twitter"} className="station-info-social-bar-item hover-fade-opacity">
                    <a className="station-info-social-bar-item-text" href={this.props.station.twitterUrl} target="_blank" rel="noopener noreferrer">
                        <IoLogoTwitter />
                    </a>
                </li>
            );
        }
        if (this.props.station.facebookUrl != null) {
            list.push(
                <li key={"facebook"} className="station-info-social-bar-item hover-fade-opacity">
                    <a className="station-info-social-bar-item-text" href={this.props.station.facebookUrl} target="_blank" rel="noopener noreferrer">
                        <IoLogoFacebook />
                    </a>
                </li>
            );
        }
        return (
            <ul className="station-info-social-bar">{list}</ul>
        )
    }
}

@observer
export default class Station extends Component {
    static async getInitialProps(ctx) {
        return { query: ctx.query };
    }

    constructor(props) {
        super(props);
        var station = StationsData.filter(station => {
            return station.name == props.query.name;
        });
        this.state = {
            station: station,
            logoHoverState: " hover-fade-opacity-hidden"
        };
    }

    componentDidMount() {
        AppStore.loading = false;
        if (this.props.query.name === "NTS 1") {
            this.interval1 = setInterval(Promise.resolve(getCurrentShowInfo("NTS 1", 0)).then(show => {
                StationStore.shows["NTS 1"].currentShow = show.title;
                StationStore.shows["NTS 1"].time = show.time;
            }), 1000);
            this.interval2 = setInterval(Promise.resolve(getCurrentShowInfo("NTS 2", 0)).then(show => {
                StationStore.shows["NTS 2"].currentShow = show.title;
                StationStore.shows["NTS 2"].time = show.time;
            }), 1000);
        } else {
            this.interval1 = setInterval(Promise.resolve(getCurrentShowInfo(this.props.query.name, 0)).then(show => {
                StationStore.shows[this.props.query.name].currentShow = show.title;
                StationStore.shows[this.props.query.name].time = show.time;
            }), 1000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval1);
        clearInterval(this.interval2);
    }

    render() {
        if (this.props.query.name === "NTS 1") {
            return (
                <div className="section row fade-in">
                    <div className="station-back">
                        <Link href="/">
                            <IoMdArrowBack className="hover-fade-opacity" />
                        </Link>
                    </div>
                    <div className="station-info">
                        <div className="station-info-logo white-border"
                            onMouseLeave={() => {
                                this.setState({
                                    logoHoverState: " hover-fade-opacity-hidden"
                                });
                            }}
                            onClick={() => {
                                if (!StationStore.shows["NTS 1"].loading && !StationStore.shows["NTS 2"].loading && StationStore.shows["NTS 1"].currentShow !== "Offline" && StationStore.shows["NTS 2"].currentShow !== "Offline") {
                                    if ((PlaybackStore.playbackInfo.station === "NTS 1" || PlaybackStore.playbackInfo.station === "NTS 2") && PlaybackStore.playing) {
                                        PlaybackStore.playing = false;
                                        this.setState({
                                            logoHoverState: ""
                                        })
                                    } else {
                                        AppStore.showPopUp = true;
                                    }
                                }
                            }}>
                            {!StationStore.shows["NTS 1"].loading && !StationStore.shows["NTS 2"].loading && StationStore.shows["NTS 1"].currentShow !== "Offline" && StationStore.shows["NTS 2"].currentShow !== "Offline" ? ((PlaybackStore.playbackInfo.station === "NTS 1" || PlaybackStore.playbackInfo.station === "NTS 2") && PlaybackStore.playing ? <FaStop className="station-info-logo-stop-icon" /> : <FaPlay className={"station-info-logo-play-icon" + this.state.logoHoverState} />) : null}
                            <img className="station-info-logo-image" src={this.state.station[0].image} alt={"NTS"} />
                        </div>
                        <div className="station-info-name">
                            NTS
                        </div>
                        <div className="station-info-show-title">
                            <b>Currently playing on NTS 1: </b>{StationStore.shows["NTS 1"].currentShow}<br />
                            <b>Currently playing on NTS 2: </b>{StationStore.shows["NTS 2"].currentShow}
                        </div>
                        <div className="station-info-description">
                            {this.state.station[0].description}
                        </div>
                        <SocialBar station={this.state.station[0]} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="section row fade-in">
                    <div className="station-back">
                        <Link href="/">
                            <IoMdArrowBack className="hover-fade-opacity" />
                        </Link>
                    </div>
                    <div className="station-info">
                        <div className="station-info-logo white-border"
                            onMouseLeave={() => {
                                this.setState({
                                    logoHoverState: " hover-fade-opacity-hidden"
                                });
                            }}
                            onClick={() => {
                                if (!StationStore.shows[this.props.query.name].loading && StationStore.shows[this.props.query.name].currentShow !== "Offline") {
                                    if (PlaybackStore.playbackInfo.station === this.props.query.name && PlaybackStore.playing) {
                                        PlaybackStore.playing = false;
                                        this.setState({
                                            logoHoverState: ""
                                        })
                                    } else {
                                        PlaybackStore.playing = false;
                                        setTimeout(() => {
                                            PlaybackStore.playbackInfo = {
                                                station: this.props.query.name,
                                                currentShow: StationStore.shows[this.props.query.name].currentShow,
                                                image: this.state.station[0].image,
                                                streamUrl: this.state.station[0].streamUrl
                                            };
                                            if (!PlaybackStore.playerLoaded)
                                                PlaybackStore.playerLoaded = true;
                                            PlaybackStore.playing = true;
                                        }, 100);
                                    }
                                }
                            }}>
                            {StationStore.shows[this.props.query.name].currentShow !== "Offline" ? (PlaybackStore.playbackInfo.station === this.props.query.name && PlaybackStore.playing ? <FaStop className="station-info-logo-stop-icon" /> : <FaPlay className={"station-info-logo-play-icon" + this.state.logoHoverState} />) : null}
                            <img className="station-info-logo-image" src={this.state.station[0].image} alt={this.state.station[0].name} />
                        </div>
                        <div className="station-info-name">
                            {this.props.query.name}
                        </div>
                        <div className="station-info-show-title">
                            <b>Currently playing: </b>{StationStore.shows[this.props.query.name].currentShow}
                        </div>
                        <div className="station-info-description">
                            {this.state.station[0].description}
                        </div>
                        <SocialBar station={this.state.station[0]} />
                    </div>
                </div>
            )
        }
    }
}