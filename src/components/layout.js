import Navbar from "../components/navbar";
import Player from "../components/player";
import PlaybackStore from "../stores/playback";
import { observer } from "mobx-react";

const Layout = observer(props => (
    <div className="layout">
        <Navbar />
        <div className="spacer-top" />
        {props.children}
        {PlaybackStore.playerLoaded ? <div className="spacer-bottom" /> : null}
        {PlaybackStore.playerLoaded ? <Player /> : null}
    </div>
));

export default Layout;