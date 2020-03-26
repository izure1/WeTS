class Asset {

    private _blob: Blob
    private _uri: string
    private _mime: string

    constructor(blob: Blob, mime: string) {
        this._blob = blob
        this._mime = mime
        this._uri = URL.createObjectURL(blob)
    }

    get blob(): Blob {
        return this._blob 
    }
    get uri(): string {
        return this._uri
    }
    get mime(): string {
        return this._mime
    }

}


export default Asset