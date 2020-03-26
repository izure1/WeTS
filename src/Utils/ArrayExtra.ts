class ArrayExtra extends Array {

    /**
     * 
     * @param array 검사할 배열입니다.
     * @param lists 추가할 요소입니다.
     * @description 검사할 배열에 추가할 요소가 없다면 추가합니다.
     */
    static add(array: any[], ...lists: any[]): void {
        for (const t of [...lists]) {
            if (array.indexOf(t) !== -1) continue
            else array.push(t)
        }
    }

    /**
     * 
     * @param array     검사할 배열입니다.
     * @param t         검사할 요소입니다.
     * @description     검사할 배열에 요소의 존재 여부를 반환합니다.
     */
    static has(array: any[], t: any): boolean {
        return array.indexOf(t) !== -1
    }

    /**
     * 
     * @param array     검사할 배열입니다.
     * @param lists     검사할 요소입니다.
     * @description     검사할 배열에 검사할 요소가 모두 존재할 경우, 참을 반환합니다.
     */
    static hasAll(array: any[], ...lists: any[]): boolean {
        let passed: boolean = true
        for (const t of [...lists]) {
            if (!ArrayExtra.has(array, t)) {
                passed = false
                break
            }
        }
        return passed
    }

    /**
     * 
     * @param array     검사할 배열입니다.
     * @param lists     검사할 요소입니다.
     * @description     검사할 배열에 검사할 요소가 한개라도 존재할 경우, 참을 반환합니다.
     */
    static hasAtLeast(array: any[], ...lists: any[]): boolean {
        let passed: boolean = false
        for (const t of [...lists]) {
            if (ArrayExtra.has(array, t)) {
                passed = true
                break
            }
        }
        return passed
    }

    /**
     * 
     * @param array     검사할 배열입니다.
     * @param lists     검사할 요소입니다.
     * @description     검사할 배열에 중복된 요소만 새로운 배열에 담아 반환합니다.
     */
    static duplicate(array: any[], ...lists: any[]): any[] {
        return [...lists].filter(t => ArrayExtra.has(array, t))
    }

    /**
     * 
     * @param array     검사할 배열입니다.
     * @param lists     검사할 요소입니다.
     * @description     검사할 배열에 중복되지 않은 요소만 새로운 배열에 담아 반환합니다.
     */
    static notDuplicate(array: any[], ...lists: any[]): any[] {
        return [...lists].filter(t => !ArrayExtra.has(array, t))
    }

    /**
     * 
     * @param array     대상 배열입니다.
     * @description     대상 배열의 모든 내용을 삭제합니다.
     */
    static clear(array: any[]): void {
        array.splice(0, array.length)
    }

    /**
     * 
     * @param array     대상 배열입니다.
     * @param t         삭제할 요소입니다.
     * @description     대상 배열에서 요소를 삭제합니다. 존재한다면 참을 반환합니다.
     */
    static delete(array: any[], t: any): boolean {
        const i: number = array.indexOf(t)
        if (i === -1) return false
        array.splice(i, 1)
        return true
    }

    static *generate(array: any[]): Generator<any> {
        for (const t of array) yield t
    }

}

export default ArrayExtra