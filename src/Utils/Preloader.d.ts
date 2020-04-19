declare class Preloader {
    /**
     *
     * @param preload   Promise를 반환하는 함수입니다.
     * @param params    preload 함수를 실행할 때 넘길 매개변수입니다.
     */
    static waitPreload<T>(preload: (...params: T[]) => Promise<any>, ...params: T[]): Promise<any>;
    static waitPreloads<T>(preloads: ((...params: T[]) => Promise<any>)[], ...params: T[]): Promise<any[]>;
    /**
     *
     * @param el        대상 엘리먼트입니다.
     * @description     대상 엘리먼트가 로드되면 반환된 프로미스가 완료됩니다.
     */
    static waitElement(el: HTMLElement | Document): Promise<void>;
    static waitElements(els: HTMLElement[]): Promise<void[]>;
}
export default Preloader;
