export class NameSectionModel {
    public readonly name: string;
    public readonly nameSize: number;
    public readonly timezoneLabel: string;
    public readonly flagUrl: string;
    public readonly isSearching: boolean;
    public readonly setSearching: Function;
    public readonly changeCountry: Function;

    constructor(
        name: string = "",
        timezone: string = "",
        flagUrl: string = "",
        isSearching: boolean = false,
        setSearching: Function,
        changeCountry: Function
    ) {

        function _getNameSize(name: string): number {
            const fontSizes: number[] = [32, 28, 24]; // in pixels
            const maxLengths: number[] = [13, 17, 21];
            for (let index in maxLengths) {
                if (name.length <= maxLengths[index]) {
                    return fontSizes[index];
                }
            }
            return 20; // default value
        }

        function _getTimezoneLabel(timezone: string): string {
            return timezone === "UTC" ? "" : timezone; // hide undefined timezones
        }

        this.name = name;
        this.nameSize = _getNameSize(name);
        this.timezoneLabel = _getTimezoneLabel(timezone);
        this.flagUrl = flagUrl;
        this.isSearching = isSearching;
        this.setSearching = setSearching;
        this.changeCountry = changeCountry;
    }
}