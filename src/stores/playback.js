import { observable } from 'mobx';

class Playback {
    @observable playerLoaded = false;
    @observable playing = false;
    @observable stationError = false;
    @observable networkError = false;
    @observable repeatSpacer;
    @observable playbackInfo = {};
}

export default new Playback();