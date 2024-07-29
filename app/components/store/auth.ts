import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Auth {
    token = "";
    login = false;
    position = false;
    reboot = false;
    constructor() {
        makeAutoObservable(this);
        makePersistable(this, { name: "potolkiAuth", properties: ["token", "login", "position"], storage: window.localStorage });
    }
    authorization(login: boolean, newToken: string) {
        this.login = login;
        this.token = newToken;
    }
    changePosition(position: boolean) {
        this.position = position;
    }
    changeReboot() {
        this.reboot = !this.reboot;
    }
}
export default new Auth();
