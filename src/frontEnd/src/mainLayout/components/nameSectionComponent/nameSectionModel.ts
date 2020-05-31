import { getCountryName } from "../../utils";
import { RawCountry } from "../infoPanelComponent/InfoPanelModel";

export class NameSectionModel {
    public readonly name: string;
    public readonly nameSize: number;
    public readonly timezoneLabel: string;
    public readonly flagUrl: string;
    public readonly isSearching: boolean;

    constructor(countryIdx: number = 0, rawCountry: RawCountry, isSearching: boolean = false) {

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

        function _getTimezoneLabel(rawCountry: RawCountry): string {
            for (let index in rawCountry.timezones) {
                const timezone = rawCountry.timezones[index];
                if (timezone !== "UTC") {
                    return timezone;
                }
            }
            return "";
        }

        this.name = getCountryName(countryIdx);
        this.nameSize = _getNameSize(this.name);
        this.timezoneLabel = _getTimezoneLabel(rawCountry);
        this.flagUrl = rawCountry.flag;
        this.isSearching = isSearching;
    }
}