import { observable } from "mobx";

class App {
    @observable loading = false;
    @observable currentPage;
    @observable showPopUp = false;
}

export default new App();