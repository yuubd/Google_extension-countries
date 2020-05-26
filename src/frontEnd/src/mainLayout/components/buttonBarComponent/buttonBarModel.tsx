export class ButtonBarModel {
    public readonly onClickPrev: Function;
    public readonly onClickNext: Function;
    public readonly onSettingsClicked: Function;

    constructor(onClickPrev: Function, onClickNext: Function, isDarkTheme: boolean = false, setDarkTheme: Function) {

        function _onSettingsClicked() {
            // temporary behaviour: theme toggling
            setDarkTheme(!isDarkTheme);
        }

        this.onClickPrev = onClickPrev;
        this.onClickNext = onClickNext;
        this.onSettingsClicked = _onSettingsClicked;
    }
}