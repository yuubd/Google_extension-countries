export class ButtonBarModel {
    public readonly isLeftDisabled: boolean;

    constructor(currIdx: number = 0) {
        function _isLeftDisabled(currIdx: number): boolean {
            return (currIdx < 1);
        }
        
        this.isLeftDisabled = _isLeftDisabled(currIdx);
    }
}