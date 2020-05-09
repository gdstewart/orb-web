import React, { Component } from "react";
import ReactPlayer from "react-player";
import { observer } from "mobx-react";
import PlaybackStore from "../stores/Playback";
import StationStore from "../stores/Station";
import AppStore from "../stores/App";
import { FaRegStopCircle, FaRegPlayCircle } from "react-icons/fa";
import Link from "next/link";

@observer
export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playStopHoverState: " hover-fade-opacity"
        };
    }

    _refreshShow() {
        PlaybackStore.playbackInfo.currentShow = StationStore.shows[PlaybackStore.playbackInfo.station].currentShow;
    }

    componentDidMount() {
        this._refreshShow();
        this.interval = setInterval(() => {
            this._refreshShow();
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="player fade-in" onClick={() => {
                AppStore.showPopUp = false;
            }}>
                {PlaybackStore.playing ?
                    <ReactPlayer
                        url={PlaybackStore.playbackInfo.streamUrl}
                        playing
                        height={0}
                        width={0}
                        playsinline /> : null}
                <ul className="player-items">
                    <li className="player-item">
                        <div className="player-station-logo">
                            <img className="player-station-logo-image white-border" src={PlaybackStore.playbackInfo.image} />
                        </div>
                    </li>
                    <li className="player-item">
                        <Link as={"/"} href={{ pathname: "/station", query: { name: PlaybackStore.playbackInfo.station } }}>
                            <div className="player-station-body hover-fade-alpha" onClick={() => {
                                AppStore.loading = true;
                            }}>
                                <div className="player-station-body-show-title">
                                    {PlaybackStore.playbackInfo.currentShow}
                                </div>
                                <div className="player-station-body-station-name">
                                    {PlaybackStore.playbackInfo.station}
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className="player-item">
                        <div className="player-play-stop"
                            onMouseLeave={() => {
                                this.setState({
                                    playStopHoverState: " hover-fade-opacity"
                                });
                            }}
                            onClick={() => {
                                this.setState({
                                    playStopHoverState: ""
                                })
                                if (PlaybackStore.playing) {
                                    PlaybackStore.playing = false;
                                } else {
                                    PlaybackStore.playing = true;
                                }
                            }}>
                            {!PlaybackStore.playing ?
                                <FaRegPlayCircle className={"player-play-stop-icon" + this.state.playStopHoverState} /> :
                                <FaRegStopCircle className={"player-play-stop-icon" + this.state.playStopHoverState} />}
                        </div>
                    </li>

                </ul>
            </div>
        )
    }
}