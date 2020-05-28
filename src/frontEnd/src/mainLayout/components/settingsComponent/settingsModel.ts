export class SettingsModel {
    public readonly themeIdx: number;

    constructor(isDarkTheme: boolean = false) {
        
        function _setThemeIdx(isDarkTheme: boolean): number {
            return (isDarkTheme ? 1 : 0);
        }

        this.themeIdx = _setThemeIdx(isDarkTheme);
    }
}