import React, { Component } from "react";
import StationStore from "../stores/station";
import PlaybackStore from "../stores/playback";
import StationsData from "../data/stationsdata";
import ShowFetcher from "../utils/showfetcher";
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
        if (this.props.query.name === "NTS 1") {
            setInterval(Promise.resolve(ShowFetcher("NTS 1", 0)).then(show => {
                StationStore.shows["NTS 1"].currentShow = show.title;
                StationStore.shows["NTS 1"].time = show.time;
            }), 1000);
            setInterval(Promise.resolve(ShowFetcher("NTS 2", 0)).then(show => {
                StationStore.shows["NTS 2"].currentShow = show.title;
                StationStore.shows["NTS 2"].time = show.time;
            }), 1000);
        } else {
            setInterval(Promise.resolve(ShowFetcher(this.props.query.name, 0)).then(show => {
                StationStore.shows[this.props.query.name].currentShow = show.title;
                StationStore.shows[this.props.query.name].time = show.time;
            }), 1000);
        }
    }

    componentWillUnmount() {

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
                                if (!StationStore.shows[this.props.query.name].loading) {
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
                            {PlaybackStore.playbackInfo.station === this.props.query.name && PlaybackStore.playing ? <FaStop className="station-info-logo-stop-icon" /> : <FaPlay className={"station-info-logo-play-icon" + this.state.logoHoverState} />}
                            <img className="station-info-logo-image" src={this.state.station[0].image} />
                        </div>
                        <div className="station-info-name">
                            NTS
                        </div>
                        <div className="station-info-show-title">
                            Currently playing on 1: {StationStore.shows["NTS 1"].currentShow}<br />
                            Currently playing on 2: {StationStore.shows["NTS 2"].currentShow}
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
                                if (!StationStore.shows[this.props.query.name].loading) {
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
                            {PlaybackStore.playbackInfo.station === this.props.query.name && PlaybackStore.playing ? <FaStop className="station-info-logo-stop-icon" /> : <FaPlay className={"station-info-logo-play-icon" + this.state.logoHoverState} />}
                            <img className="station-info-logo-image" src={this.state.station[0].image} />
                        </div>
                        <div className="station-info-name">
                            {this.props.query.name}
                        </div>
                        <div className="station-info-show-title">
                            Currently playing: {StationStore.shows[this.props.query.name].currentShow}
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