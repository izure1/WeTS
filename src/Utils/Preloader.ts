import whenDomReady from 'when-dom-ready'

class Preloader {

    /**
     * 
     * @param preload   Promise를 반환하는 함수입니다.
     * @param params    preload 함수를 실행할 때 넘길 매개변수입니다.
     */
    static waitPreload(preload: Function, ...params: any[]): Promise<any> {
        return new Promise((resolve, reject) => {
            preload(...params).then(resolve).catch(reject)
        })
    }

    static waitPreloads(preloads: Function[], ...params: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const results: any[] = []
            for (const preload of preloads) {
                const result: any = Preloader.waitPreload(preload, ...params)
                results.push(result)
            }
            Promise.all(results).then(resolve).catch(reject)
        })
    }

    /**
     * 
     * @param el        대상 엘리먼트입니다.
     * @description     대상 엘리먼트가 로드되면 반환된 프로미스가 완료됩니다.
     */
    static waitElement(el: HTMLElement): Promise<void> {
        return whenDomReady(el)
    }

    static waitElements(els: HTMLElement[]): Promise<void[]> {
        return new Promise((resolve, reject) => {
            const promises: Promise<void>[] = []
            for (const el of els) {
                const promise = Preloader.waitElement(el)
                promises.push(promise)
            }
            Promise.all(promises).then(resolve).catch(reject)
        })
    }

}

export default Preloader