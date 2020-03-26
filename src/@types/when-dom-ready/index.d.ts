declare module 'when-dom-ready' {
    interface WhenDomReady {
        (param: HTMLElement | Function, option?: object): Promise<void>,
        resume(param: HTMLElement | Function): Promise<void>,
    }
    const whenDomReady: WhenDomReady
    export default whenDomReady
}