export class SearchBarModel {
    public readonly initStr: string;
    public readonly searchFontSize: number;

    constructor(initStr: string, nameSize: number = 20) {

        function _getSearchFontSize(nameSize: number): number {
            return nameSize * 0.9;
        }

        this.initStr = initStr;
        this.searchFontSize = _getSearchFontSize(nameSize);
    }
}