interface DefaultObjectCase {
    [key: string]: any
}

class ObjectExtra extends Object {
    constructor(...params: any) {
        super(...params)
    }

    /**
     * 
     * @param target    검사할 오브젝트입니다.
     * @param sources   추가할 오브젝트입니다.
     * @description     검사할 오브젝트에 존재하는 프로퍼티만 추가할 오브젝트의 프로퍼티의 값으로 덮어씁니다.
     */
    overwrite(target: DefaultObjectCase, ...sources: DefaultObjectCase[]) {
        const keys: string[] = Object.keys(target)
        for (const source of sources) {
            const sub: string[] = Object.keys(source)
            for (const property of sub) {
                if (keys.indexOf(property) === -1) continue
                else target[property] = source[property]
            }
        }
        return target
    }
}

export default ObjectExtra