import Navbar from "./Navbar";
import Player from "./Player";
import LoadingOverlay from "./LoadingOverlay";
import PopUp from "./PopUp";
import PlaybackStore from "../stores/playback";
import AppStore from "../stores/app";
import { observer } from "mobx-react";

const Layout = observer(props => (
    <div className="layout">
        {AppStore.loading ? <LoadingOverlay /> : null}
        {AppStore.showPopUp ? <PopUp /> : null}
        <Navbar />
        <div className="spacer-top" />
        {props.children}
        {PlaybackStore.playerLoaded ? <div className="spacer-bottom" /> : null}
        {PlaybackStore.playerLoaded ? <Player /> : null}
    </div>
));

export default Layout;