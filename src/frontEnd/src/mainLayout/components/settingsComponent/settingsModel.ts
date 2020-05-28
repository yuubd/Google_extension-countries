export enum SETTING_TYPES {
    THRESHOLD = "threshold",
    THEME = "theme"
}

export class SettingsModel {
    public readonly themeIndex: number;
    public readonly getModalOptions: Function;
    public readonly getModalValue: Function;
    public readonly loadTimeThreshold: Function;
    public readonly onModalSaveClicked: Function;

    constructor(isDarkTheme: boolean, setDarkTheme: Function) {

        const _thresholdTimeArr: number[] = [60, 120, 300, 600, 0];
        const _thresholdStrArr: string[] = ["1 minute", "2 minutes", "5 minutes", "10 minutes", "disable"];
        const _themeArr: string[] = ["Light Mode", "Dark Mode"];

        function _getThemeIndex(isDarkTheme: boolean): number {
            return (isDarkTheme ? 1 : 0);
        }

        function _getModalOptions(type: string): string[] {
            if (type === SETTING_TYPES.THRESHOLD) {
                return _thresholdStrArr;
            } else if (type === SETTING_TYPES.THEME) {
                return _themeArr;
            } else {
                return [];
            }
        }

        function _getModalValue(type: string, index: number): string {
            if (type === SETTING_TYPES.THRESHOLD) {
                return _thresholdStrArr[index];
            } else if (type === SETTING_TYPES.THEME) {
                return _themeArr[index];
            } else {
                return "";
            }
        }

        function _loadTimeThreshold(setThresholdIdx: Function, setModalThresholdIdx: Function): void {
            chrome.storage.local.get("timeThreshold", (storage) => {
                if (typeof storage.timeThreshold === "number") {
                    let seconds: number = storage.timeThreshold;
                    for (let index in _thresholdTimeArr) {
                        if (seconds === _thresholdTimeArr[index]) {
                            setThresholdIdx(index);
                            setModalThresholdIdx(index);
                            break;
                        }
                    }
                }
            });
        }

        function _onModalSaveClicked(modalType: string, index: number, setModalType: Function, setThresholdIdx?: Function) {
            if (modalType === SETTING_TYPES.THRESHOLD) {
                chrome.storage.local.set({ timeThreshold: _thresholdTimeArr[index] });
                setThresholdIdx ? setThresholdIdx(index) : "";
            } else if (modalType === SETTING_TYPES.THEME) {
                chrome.storage.local.set({ isDarkTheme: (index === 1) });
                setDarkTheme(index === 1);
            }
            setModalType("");
        }

        this.themeIndex = _getThemeIndex(isDarkTheme);
        this.getModalOptions = _getModalOptions;
        this.getModalValue = _getModalValue;
        this.loadTimeThreshold = _loadTimeThreshold;
        this.onModalSaveClicked = _onModalSaveClicked;
    }
}