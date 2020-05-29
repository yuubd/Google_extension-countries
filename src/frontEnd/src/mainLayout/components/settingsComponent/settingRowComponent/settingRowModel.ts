import { SettingItem } from "../settingsComponent";

export class SettingRowModel {
    public readonly type: string;
    public readonly title: string;
    public readonly description: string;
    public readonly isClickable: boolean;

    constructor(settingItem: SettingItem, selectedIdx: number) {

        function _isClickable(settingItem: SettingItem): boolean {
            return settingItem.labels.length > 1;
        }

        this.type = settingItem.id;
        this.title = settingItem.title;
        this.description = settingItem.labels[selectedIdx];
        this.isClickable = _isClickable(settingItem);
    }
}
