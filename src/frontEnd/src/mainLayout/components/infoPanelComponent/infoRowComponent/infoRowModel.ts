export class InfoRowModel {
    public readonly iconSrc: string;
    public readonly title: string;
    public readonly value: string;
    public readonly valueClass: string;

    constructor(title: string = "", value: string = "") {
        function _getIconFromTitle(title: string): string {
            let name: string = title.substring(0, 4).toLowerCase(); // icon name uses first 4 letters
            return require(`../assets/icon_${name}.png`);
        }
        function _getValueElement(value: string): string {
            return value.length < 32 ? "value" : "value very-long-value"
        }

        this.iconSrc = _getIconFromTitle(title);
        this.title = title;
        this.value = value;
        this.valueClass = _getValueElement(value);
    }
}