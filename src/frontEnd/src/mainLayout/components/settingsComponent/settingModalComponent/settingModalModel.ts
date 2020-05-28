export class SettingModalModel {
    public readonly title: string;
    public readonly options: string[];
    public readonly selected: string;

    constructor(title: string = "", options: string[] = [], selected: string = "") {
        this.title = title;
        this.options = options;
        this.selected = selected;
    }
}