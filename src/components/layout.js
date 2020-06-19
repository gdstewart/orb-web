import Navbar from "./navbar";
import Player from "./player";
import LoadingOverlay from "./loadingoverlay";
import PopUp from "./popup";
import MobileView from "./mobileview";
import PlaybackStore from "../stores/playback";
import AppStore from "../stores/app";
import { observer } from "mobx-react";

const Layout = observer(props => (
    <div className="layout">
        <MobileView />
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