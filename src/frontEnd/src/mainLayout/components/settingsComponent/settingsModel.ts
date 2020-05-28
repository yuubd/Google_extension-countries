export const THRESHOLD_TIMES: number[] = [60, 120, 300, 600, 0];
export const THRESHOLD_LABELS: string[] = ["1 minute", "2 minutes", "5 minutes", "10 minutes", "disable"];
export const THEME_LABELS: string[] = ["Light Mode", "Dark Mode"];

export class SettingsModel {
    public readonly themeIndex: number;
    public readonly getModalOptions: Function;
    public readonly getModalValue: Function;

    constructor(isDarkTheme: boolean) {

        function _getThemeIndex(isDarkTheme: boolean): number {
            return (isDarkTheme ? 1 : 0);
        }

        function _getModalOptions(type: string): string[] {
            if (type === "threshold") {
                return THRESHOLD_LABELS;
            } else if (type === "theme") {
                return THEME_LABELS;
            } else {
                return [];
            }
        }

        function _getModalValue(type: string, index: number): string {
            if (type === "threshold") {
                return THRESHOLD_LABELS[index];
            } else if (type === "theme") {
                return THEME_LABELS[index];
            } else {
                return "";
            }
        }

        this.themeIndex = _getThemeIndex(isDarkTheme);
        this.getModalOptions = _getModalOptions;
        this.getModalValue = _getModalValue;
    }
}