declare class Asset {
    private _blob;
    private _uri;
    private _mime;
    constructor(blob: Blob, mime: string);
    get blob(): Blob;
    get uri(): string;
    get mime(): string;
}
export default Asset;
