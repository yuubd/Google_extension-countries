export class ButtonBarModel {
    public readonly isLeftDisabled: boolean;
    public readonly isRightDisabled: boolean;

    constructor(currIdx: number = 0, isSettingsPage: boolean = false) {
        function _isLeftDisabled(currIdx: number, isSettingsPage: boolean): boolean {
            return (isSettingsPage || (currIdx < 1));
        }
        
        this.isLeftDisabled = _isLeftDisabled(currIdx, isSettingsPage);
        this.isRightDisabled = isSettingsPage;
    }
}