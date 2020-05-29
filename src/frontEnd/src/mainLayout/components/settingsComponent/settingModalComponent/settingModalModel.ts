import { SettingItem } from "../settingsComponent";

export class SettingModalModel {
    public readonly title: string;
    public readonly options: string[];
    public readonly selectedIdx: number;

    constructor(settings: SettingItem, selectedIdx: number = 0) {
        this.title = settings.title;
        this.options = settings.labels;
        this.selectedIdx = +selectedIdx;
    }
}
