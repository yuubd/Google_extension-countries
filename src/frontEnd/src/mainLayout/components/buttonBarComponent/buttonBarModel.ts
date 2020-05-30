export class ButtonBarModel {
    public readonly isDisabled: boolean;

    constructor(isSettingsPage: boolean = false) {
        this.isDisabled = isSettingsPage;
    }
}