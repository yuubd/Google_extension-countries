export class PageHeaderModel {
    public readonly title: string;
    public readonly onGoBackClicked: Function;

    constructor(title: string = "", onGoBackClicked: Function) {
        this.title = title;
        this.onGoBackClicked = onGoBackClicked;
    }
}