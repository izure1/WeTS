import Asset from './Asset';
declare class AssetLoader {
    private static list;
    private static queue;
    static getUri(uri: string): string;
    static get assets(): Asset[];
    private static getBuffer;
    /**
     *
     * @param uri       에셋의 주소입니다
     * @param mime      에셋의 mime 타입입니다. 기본값은 application/octet-stream 입니다.
     */
    static add(uri: string, mime: string): Promise<Asset>;
    /**
     *
     * @param maps      에셋의 정보를 가진 [uri, mime]의 튜플 구조 배열입니다.
     */
    static addFromArray(maps: string[]): Promise<void>;
    /**
     * @description     현재 queue에 대기 중인 모든 에셋이 로드될 때 까지 대기합니다.
     */
    static load(): Promise<Asset[]>;
    /**
     *
     * @param src       불러올 에셋의 경로입니다.
     * @description     불러올 에셋의 경로가 리스트에 존재한다면 Asset 인스턴스를 반환합니다. 없다면 null을 반환합니다.
     */
    static getAsset(src: string): Asset | null;
}
export default AssetLoader;
