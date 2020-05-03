export class CountryModel {
    public readonly name: string;                  // used for Map
    public readonly flagUrl: string;               // used for flag
    public readonly infoRows: Array<InfoRowModel>; // used for infoPanel

    // TODO implement a layer between layout componenet and data model to convert JSON to data model
    constructor(name: string = "", flagUrl: string = "", infoRows: Array<InfoRowModel> = []) {
        // if (!name) {
        //     throw new Error(`Error instantiating CountryModel, name invalid: ${name}`);
        // } else if(!code) {
        //     throw new Error(`Error instantiating CountryModel, code invalid: ${code}`);
        // } else if (!infoRows || infoRows.length) {
        //     throw new Error(`Error instantiating CountryModel, infoRows invalid: ${infoRows}`);
        // }
        this.name = name;
        this.flagUrl = flagUrl;
        this.infoRows = infoRows;
    }
}

export class InfoRowModel {
    public readonly title: string;
    public readonly value: string;

    constructor(title: string, value: string) {
        // if (!title) {
        //     throw new Error(`Error instantiating InfoRowModel, title invalid: ${title}`);
        // } else if (!value) {
        //     throw new Error(`Error instantiating InfoRowModel, value invalid: ${value}`);
        // }
        this.title = title;
        this.value = value;
    }
}
