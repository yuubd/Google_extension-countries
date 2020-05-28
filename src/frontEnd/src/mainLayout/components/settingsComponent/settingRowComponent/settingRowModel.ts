export class SettingRowModel {
    public readonly title: string;
    public readonly description: string;

    constructor(title: string = "", description: string = "") {
        this.title = title;
        this.description = description;
    }
}