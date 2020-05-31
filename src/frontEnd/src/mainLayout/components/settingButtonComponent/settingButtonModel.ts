export class SettingButtonModel {
    public readonly isSettingsPage: boolean;
    public readonly icon: string;
    public readonly iconSrc: string;

    constructor(isSettingsPage: boolean = false) {

        function _getIcon(isSettingsPage: boolean): string {
            return isSettingsPage ? "home" : "settings";
        }

        function _getIconSrc(icon: string): string {
            return require(`./assets/icon_${icon}.png`);
        }

        this.isSettingsPage = isSettingsPage;
        this.icon = _getIcon(isSettingsPage);
        this.iconSrc = _getIconSrc(this.icon);
    }
}