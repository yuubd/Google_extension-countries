export class ButtonBarModel {
    public readonly isSettingsPage: boolean;

    constructor(isSettingsPage: boolean = false) {
        this.isSettingsPage = isSettingsPage;
    }
}