import { observable } from "mobx";

class Station {
    @observable stations = [];
    @observable shows = {};
}

export default new Station();