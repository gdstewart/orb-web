import React, { Component } from "react";
import StationStore from "../stores/station";
import PlaybackStore from "../stores/playback";
import AppStore from "../stores/app";

export default class PopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option1: StationStore.stations.find(station => station.name === "NTS 1"),
            option2: StationStore.stations.find(station => station.name === "NTS 2")
        }
    }

    render() {
        return (
            <div className="overlay fade-in-fast" onClick={() => {
                AppStore.showPopUp = false;
            }}>>
                <div className="pop-up white-border">
                    <div className="pop-up-option hover-fade-alpha"
                        onClick={() => {
                            if (StationStore.shows["NTS 1"].currentShow !== "Offline") {
                                if (PlaybackStore.playbackInfo.station !== this.state.option1.name) {
                                    PlaybackStore.playing = false;
                                    setTimeout(() => {
                                        PlaybackStore.playbackInfo = {
                                            station: this.state.option1.name,
                                            currentShow: StationStore.shows["NTS 1"].currentShow,
                                            image: this.state.option1.image,
                                            streamUrl: this.state.option1.streamUrl
                                        };
                                        if (!PlaybackStore.playerLoaded)
                                            PlaybackStore.playerLoaded = true;
                                        PlaybackStore.playing = true;
                                    }, 100);
                                }
                            }
                            AppStore.showPopUp = false;
                        }}>
                        {"Play NTS 1: " + StationStore.shows["NTS 1"].currentShow}
                    </div>
                    <div className="pop-up-option hover-fade-alpha"
                        onClick={() => {
                            if (StationStore.shows["NTS 2"].currentShow !== "Offline") {
                                if (PlaybackStore.playbackInfo.station !== this.state.option2.name) {
                                    PlaybackStore.playing = false;
                                    setTimeout(() => {
                                        PlaybackStore.playbackInfo = {
                                            station: this.state.option2.name,
                                            currentShow: StationStore.shows["NTS 2"].currentShow,
                                            image: this.state.option2.image,
                                            streamUrl: this.state.option2.streamUrl
                                        };
                                        if (!PlaybackStore.playerLoaded)
                                            PlaybackStore.playerLoaded = true;
                                        PlaybackStore.playing = true;
                                    }, 100);
                                }
                            }
                            AppStore.showPopUp = false;
                        }}>
                        {"Play NTS 2: " + StationStore.shows["NTS 2"].currentShow}
                    </div>
                </div>
            </div>
        )
    }
}