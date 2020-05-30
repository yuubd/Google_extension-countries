export class SettingButtonModel {
    public readonly isSettingsPage: boolean;
    public readonly icon: string;

    constructor(isSettingsPage: boolean = false) {
        function _getIcon(isSettingsPage: boolean): string {
            return isSettingsPage ? "home" : "setting";
        }

        this.isSettingsPage = isSettingsPage;
        this.icon = _getIcon(isSettingsPage);
    }
}