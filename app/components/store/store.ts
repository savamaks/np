import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Auth {
    token: string = "";
    login: boolean = false;
    position: boolean = false;
    reboot: boolean = false;

    constructor() {
        makeAutoObservable(this);
        makePersistable(this, {
            name: "potolkiAuth",
            properties: ["token", "login", "position"],
            storage: typeof window !== "undefined" ? window.localStorage : undefined,
        });
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

class App {
    prewiew: Array<string> = [];
    arrPreviews: Array<string> = [];
    constructor() {
        makeAutoObservable(this);
    }
    changeArrPreviews(value: Array<string>) {
        this.arrPreviews = value;
    }
    changePreview(value: Array<string>) {
        this.prewiew = value;
    }
}
export class RootStore {
    authService = new Auth();
    appService = new App();
}
