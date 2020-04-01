declare module 'when-dom-ready' {
    interface WhenDomReady {
        (param: Document | HTMLElement | Function, option?: object): Promise<void>,
        resume(param: Document | HTMLElement | Function): Promise<void>,
    }
    const whenDomReady: WhenDomReady
    export default whenDomReady
}