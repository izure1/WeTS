import shortid from 'shortid'

class Angle {

    private _radian: number = 0
    
    static radianToDegree(v: number): number {
        return v * (180 / Math.PI)
    }

    static degreeToRadian(v: number): number {
        return v * (Math.PI / 180)
    }

    get angle(): number {
        return Angle.radianToDegree(this._radian)
    }

    get radian(): number {
        return this._radian
    }

    /**
     * 
     * @param v  이 라디안값으로부터 초기화합니다.
     */
    fromRadian(v: number): Angle {
        this._radian = v
        return this
    }

    /**
     * 
     * @param v  이 디그리값으로부터 초기화합니다.
     */
    fromDegree(v: number): Angle {
        this._radian = Angle.degreeToRadian(v)
        return this
    }

}


class Random {

    /**
     * @description  1 또는 -1을 랜덤으로 반환합니다.
     */
    static plusMinus(): number {
        return Math.random() > 0.5 ? 1 : -1
    }

    /**
     * 
     * @param a  시작값입니다.
     * @param b  마지막 값입니다.
     * @description  시작값과 마지막값 사이의 랜덤한 값을 반환합니다.
     */
    static between(a: number = 0, b: number = 1): number {
        return Math.random() * (b - a) + a
    }

    /**
     * @description  짧은 랜덤 문자열을 반환합니다.
     */
    static shortid(): string {
        return shortid.generate()
    }

    /**
     * @description  uuid 서식의 랜덤 문자열을 반환합니다.
     */
    static uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
            let r: number = Math.random() * 16 | 0,
                v: number = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        }) 
    }

}

class Compare {
    /**
     * 
     * @param a         비교할 숫자입니다.
     * @param b         비교할 숫자입니다.
     * @description     a와 b 중 더 큰 값을 반환합니다.
     */
    static getBiggerNumber(a: number, b: number): number {
        return a > b ? a : b
    }

    /**
     * 
     * @param a         비교할 숫자입니다.
     * @param b         비교할 숫자입니다.
     * @description     a와 b 중 더 작은 값을 반환합니다.
     */
    static getSmallerNumber(a: number, b: number): number {
        return a > b ? b : a
    }
}


export { Angle, Random, Compare }