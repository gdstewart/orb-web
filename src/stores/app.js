import { observable } from "mobx";

class App {
    @observable loading = false;
    @observable currentPage;
    @observable showPopUp = false;
    @observable selectedThemeColor;
    @observable themeColors = ["#000000", "#330099", "#CC0099"];
}

export default new App();