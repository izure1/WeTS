interface IVector {
    width: number;
    height: number;
    x: number;
    y: number;
}
declare class ElementSize {
    protected static createElement(tag: string): HTMLElement;
    protected static getSize(el: any, src: string, widthProperty: string, heightProperty: string): Promise<IVector>;
}
declare class ImageSize extends ElementSize {
    private static readonly tag;
    private static readonly x;
    private static readonly y;
    /**
     *
     * @param src       이미지 주소입니다.
     * @description     이미지 주소로부터 원본 이미지의 가로와 세로 크기를 반환합니다.
     */
    static calc(src: string): Promise<IVector>;
}
declare class VideoSize extends ElementSize {
    private static readonly tag;
    private static readonly x;
    private static readonly y;
    /**
     *
     * @param src       비디오 주소입니다.
     * @description     비디오 주소로부터 원본 이미지의 가로와 세로 크기를 반환합니다.
     */
    static calc(src: string): Promise<IVector>;
}
export { ImageSize, VideoSize };
