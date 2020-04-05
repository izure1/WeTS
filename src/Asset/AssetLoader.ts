import Asset from './Asset'

class AssetLoader {

    private static list: Map<string, Asset> = new Map
    private static queue: Map<string, Promise<[string, Asset]>> = new Map
    
    static getUri(uri: string): string {
        const asset: Asset | undefined = AssetLoader.list.get(uri)
        return asset ? asset.uri : uri
    }

    static get assets(): Asset[] {
        return Array.from(AssetLoader.list.values())
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
     * @param uri       에셋의 주소입니다
     * @param mime      에셋의 mime 타입입니다. 기본값은 application/octet-stream 입니다.
     */
    static async add(uri: string, mime: string): Promise<Asset> {
        let asset: Asset
        // 에셋이 로드되지도, 로딩되고 있지도 않을 경우, 불러오기를 시도합니다.
        if (
            !AssetLoader.list.has(uri) &&
            !AssetLoader.queue.has(uri)) {
                const loader: Promise<[string, Asset]> = AssetLoader.getBuffer(uri, mime)
                AssetLoader.queue.set(uri, loader)
                asset = (await loader)[1]
                AssetLoader.queue.delete(uri)
                AssetLoader.list.set(uri, asset)
        }
        else if (AssetLoader.list.has(uri)) {
            asset = AssetLoader.list.get(uri)!
        }
        else if (AssetLoader.queue.has(uri)) {
            const tuple: [string, Asset] = await AssetLoader.queue.get(uri)!
            asset = tuple[1]
        }
        else throw 'UNKNOWN ERROR'
        return asset!
    }

    /**
     * 
     * @param maps      에셋의 정보를 가진 [uri, mime]의 튜플 구조 배열입니다.
     */
    static async addFromArray(maps: string[]): Promise<void> {
        for (const [uri, mime] of maps) {
            await this.add(uri, mime)
        }
    }

    /**
     * @description     현재 queue에 대기 중인 모든 에셋이 로드될 때 까지 대기합니다.
     */
    static async load(): Promise<Asset[]> {
        const loaders: Promise<[string, Asset]>[] = Array.from(AssetLoader.queue.values())
        const tuples: [string, Asset][] = await Promise.all(loaders)
        return tuples.map(t => t[1])
    }

    /**
     * 
     * @param src       불러올 에셋의 경로입니다.
     * @description     불러올 에셋의 경로가 리스트에 존재한다면 Asset 인스턴스를 반환합니다. 없다면 null을 반환합니다.
     */
    static getAsset(src: string): Asset | null {
        const hasAsset: boolean = AssetLoader.list.has(src)
        return hasAsset ? AssetLoader.list.get(src)! : null
    }

}

export default AssetLoader