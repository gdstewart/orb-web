import { observable } from "mobx";

class Schedule {
    @observable currentStation;
    @observable currentDay;
    @observable currentSchedule;
}

export default new Schedule();