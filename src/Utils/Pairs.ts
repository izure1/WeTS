class PairsManager {
    /**
     * 
     * @param pairLists 초기값입니다. 페어들을 배열을 매개변수로 넘깁니다.
     * @description     새로운 페어 목록을 만들어 반환합니다.
     */
    static create(...pairLists: string[][]): string[][] {
        const pairs: string[][] = []
        for (const pair of pairLists) pairs.push(pair)
        return pairs
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      서로 관련을 가지는 추가할 문자열입니다.
     * @description     서로 관련 있는 문자열을 매개변수로 넘겨 페어로 지정합니다.
     */
    static add(pairs: string[][], ...keys: string[]): string[][] {
        const allKeys: Set<string> = new Set([...keys])
        const totalKeys: Set<string> = new Set
        const lists: Set<string[]> = new Set

        // 새로 받은 key를 보유하고 있는 모든 페어 배열을 받아와 lists 변수에 담습니다.
        for (const key of allKeys) {
            for (const pair of pairs) {
                const hasKey: boolean = pair.indexOf(key) !== -1
                if (hasKey) lists.add(pair)
            }
        }
        // lists 변수에 담긴 페어 배열을 pairs 배열에서 삭제합니다.
        // 이후 삭제된 pair 배열의 내용물을 prevPair 변수에 담습니다.
        for (const pair of lists) {
            let i: number = pairs.length
            while (i--) {
                if (pairs[i] === pair) {
                    pairs.splice(i, 1)
                    for (const key of pair) totalKeys.add(key)
                }
            }
        }

        // 새로운 페어 배열을 만듭니다.
        // 이 배열에는 이전에 prevPair에 있던 모든 내용을 중복없이 하나로 합쳤습니다.
        const newKeys: Set<string> = [...allKeys].reduce((totalKeys: Set<string>, key: string) => totalKeys.add(key), totalKeys)
        const newPair: string[] = [...newKeys]

        pairs.push(newPair)
        return pairs
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @description     Pairs 인스턴스에 담긴 모든 문자열을 페어로 반환합니다.
     */
    static all(pairs: string[][]): string[] {
        const lists: string[] = []
        for (const pair of pairs) lists.push(...pair)
        return [...new Set(lists)]
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는 페어를 반환합니다.
     */
    static get(pairs: string[][], u: string): string[] {
        for (const pair of pairs) {
            const hasKey: boolean = pair.indexOf(u) === -1
            if (hasKey) return pair
        }
        return [] as string[]
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는지 여부를 반환합니다.
     */
    static has(pairs: string[][], u: string): boolean {
        return !!PairsManager.get(pairs, u)
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     페어가 대상 문자열을 포함하고 있다면 문자열을 삭제하고, 해당 페어를 반환합니다. 어떤 페어도 대상 문자열을 가지고 있지 않다면 null을 반환합니다.
     */
    static delete(pairs: string[][], u: string): string[] | null {
        const t: string[] = PairsManager.get(pairs, u)
        if (!t) return null
        else {
            const i: number = t.indexOf(u)
            t.splice(i, 1)
            return t
        }
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는 페어를 페어 목록에서 삭제합니다.
     */
    static drop(pairs: string[][], u: string): void {
        let i: number = pairs.length
        while (i--) {
            const hasKey = pairs[i].indexOf(u) !== -1
            if (hasKey) pairs.splice(i, 1)
        }
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @description     페어 목록을 모두 제거하여 초기화합니다.
     */
    static clear(pairs: string[][]): void {
        pairs.splice(0, pairs.length)
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      대상 문자열입니다.
     * @description     대상 문자열을 모두 포함하고 있는 페어를 반환합니다.
     */
    static getAnd(pairs: string[][], ...keys: string[]): string[] {
        const result: Set<string> = new Set
        for (const u of [...keys]) {
            const keys: string[] = PairsManager.get(pairs, u)
            if (keys.length)
                for (const key of keys) result.add(key)
            else {
                result.clear()
                break
            }
        }
        return [...result]
    }

    /**
     * 
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      대상 문자열입니다.
     * @description     대상 문자열 중 한개라도 포함하고 있는 페어들의 모든 문자열을 페어로 반환합니다.
     */
    static getOr(pairs: string[][], ...keys: string[]): string[] {
        const result: Set<string> = new Set
        for (const u of [...keys]) {
            const keys: string[] = PairsManager.get(pairs, u)
            for (const key of keys) result.add(key)
        }
        return [...result]
    }
}

export default PairsManager