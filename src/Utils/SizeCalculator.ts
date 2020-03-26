interface IVector {
    width: number
    height: number
    x: number
    y: number
}

class ElementSize {
    protected static createElement(tag: string): HTMLElement {
        return document.createElement(tag)
    }
    protected static getSize(el: any, src: string, widthProperty: string, heightProperty: string): Promise<IVector> {
        return new Promise((resolve, reject) => {
            let x: any, y: any
            el.src = src
            el.onload = () => {
                x = el[widthProperty]
                y = el[heightProperty]
                const vector: IVector = { width: x, height: y, x, y }
                resolve(vector)
            }
            el.onerror = el.onabort = () => {
                const vector: IVector = { width: 0, height: 0, x: 0, y: 0 }
                reject(vector)
            }
        })
    }
}

class ImageSize extends ElementSize {
    private static readonly tag: string = 'img'
    private static readonly x: keyof HTMLImageElement = 'naturalWidth'
    private static readonly y: keyof HTMLImageElement = 'naturalHeight'

    /**
     * 
     * @param src       이미지 주소입니다.
     * @description     이미지 주소로부터 원본 이미지의 가로와 세로 크기를 반환합니다.
     */
    static async calc(src: string): Promise<IVector> {
        const { tag, x, y } = ImageSize
        const element: HTMLElement = ElementSize.createElement(tag)
        return await ElementSize.getSize(element, src, x, y)
    }
}

class VideoSize extends ElementSize {
    private static readonly tag: string = 'video'
    private static readonly x: keyof HTMLVideoElement = 'videoWidth'
    private static readonly y: keyof HTMLVideoElement = 'videoHeight'

    /**
     * 
     * @param src       비디오 주소입니다.
     * @description     비디오 주소로부터 원본 이미지의 가로와 세로 크기를 반환합니다.
     */
    static async calc(src: string): Promise<IVector> {
        const { tag, x, y } = VideoSize
        const element: HTMLElement = ElementSize.createElement(tag)
        return await ElementSize.getSize(tag, src, x, y)
    }
}

export { ImageSize, VideoSize }