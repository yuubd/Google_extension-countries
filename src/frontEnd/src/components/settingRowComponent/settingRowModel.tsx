export class SettingRowModel {
    public readonly title: string;
    public readonly description: string;
    public readonly isClickable: boolean;
    public readonly onSettingClick: Function;

    constructor(title: string = "", description: string = "", onSettingClick?: Function) {

        function _isClickable(): boolean {
            return (onSettingClick !== undefined);
        }

        function _onSettingClick(): void {
            if (onSettingClick !== undefined) {
                onSettingClick();
            }
        }

        this.title = title;
        this.description = description;
        this.isClickable = _isClickable();
        this.onSettingClick = _onSettingClick;
    }
}