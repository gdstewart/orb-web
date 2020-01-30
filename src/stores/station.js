import { observable } from "mobx";

class Station {
    @observable stations = [];
}

export default new Station();