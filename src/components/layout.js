import Navbar from "../components/navbar";
import Player from "../components/player";
import LoadingOverlay from "../components/loadingoverlay";
import PopUp from "../components/popup";
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