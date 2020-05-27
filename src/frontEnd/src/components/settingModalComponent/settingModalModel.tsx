export class SettingModalModel {
    public readonly title: string;
    public readonly options: string[];
    public readonly selected: string;
    public readonly onOptionChanged: Function;
    public readonly onSaveClicked: Function;

    constructor(title: string = "", options: string[] = [], selected: string = "", onOptionChanged: Function, onSaveClicked: Function) {
        this.title = title;
        this.options = options;
        this.selected = selected;
        this.onOptionChanged = onOptionChanged;
        this.onSaveClicked = onSaveClicked;
    }
}