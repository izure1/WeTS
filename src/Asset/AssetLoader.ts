import Asset from './Asset'

class AssetLoader {

    private static list: Map<string, Asset> = new Map
    private static queue: Map<string, Promise<[string, Asset]>> = new Map
    
    static getUri(uri: string): string {
        const asset: Asset | undefined = AssetLoader.list.get(uri)
        return asset ? asset.uri : uri
    }

    static get assets(): Asset[] {
        return Array.from(this.list.values())
    }

    private static getBuffer(uri: string, mime: string = 'application/octet-stream'): Promise<[string, Asset]> {
        return new Promise((resolve, reject) => {
            const xml: XMLHttpRequest = new XMLHttpRequest
            xml.open('GET', uri)
            xml.onload = () => {
                if (xml.status !== 200) reject()
                else {
                    const blob: Blob = new Blob([xml.response], { type: mime })
                    const asset: Asset = new Asset(blob, mime)
                    resolve([uri, asset])
                }
            }
            xml.onabort = xml.onerror = reject
            xml.responseType = 'blob'
            xml.send(null)
        })
    }

    /**
     * 
     * @param uri  에셋의 주소입니다
     * @param mime  에셋의 mime 타입입니다. 기본값은 application/octet-stream 입니다.
     */
    static async add(uri: string, mime: string): Promise<Asset> {
        const loader: typeof AssetLoader = AssetLoader
        let asset: Asset
        // 에셋이 로드되지도, 로딩되고 있지도 않을 경우, 불러오기를 시도합니다.
        if (
            !loader.list.has(uri) &&
            !loader.queue.has(uri)) {
            loader.queue.set(uri, this.getBuffer(uri, mime))
        }
        else if (loader.list.has(uri)) {
            asset = loader.list.get(uri)!
        }
        else if (loader.queue.has(uri)) {
            const tuple: [string, Asset] = await loader.queue.get(uri)!
            asset = tuple[1]
        }
        else throw 'UNKNOWN ERROR'
        return asset!
    }

    /**
     * 
     * @param maps  에셋의 정보를 가진 [uri, mime]의 튜플 구조 배열입니다.
     */
    static async addFromArray(maps: string[]): Promise<void> {
        for (const [uri, mime] of maps) {
            await this.add(uri, mime)
        }
    }

    static async load(): Promise<Asset[]> {
        return this.assets
    }

}

export default AssetLoader