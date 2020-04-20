declare class Angle {
    private _radian;
    static radianToDegree(v: number): number;
    static degreeToRadian(v: number): number;
    get angle(): number;
    get radian(): number;
    /**
     *
     * @param v  이 라디안값으로부터 초기화합니다.
     */
    fromRadian(v: number): Angle;
    /**
     *
     * @param v  이 디그리값으로부터 초기화합니다.
     */
    fromDegree(v: number): Angle;
}
declare class Random {
    /**
     * @description  1 또는 -1을 랜덤으로 반환합니다.
     */
    static plusMinus(): number;
    /**
     *
     * @param a  시작값입니다.
     * @param b  마지막 값입니다.
     * @description  시작값과 마지막값 사이의 랜덤한 값을 반환합니다.
     */
    static between(a?: number, b?: number): number;
    /**
     * @description  짧은 랜덤 문자열을 반환합니다.
     */
    static shortid(): string;
    /**
     * @description  uuid 서식의 랜덤 문자열을 반환합니다.
     */
    static uuid(): string;
}
declare class Compare {
    /**
     *
     * @param a         비교할 숫자입니다.
     * @param b         비교할 숫자입니다.
     * @description     a와 b 중 더 큰 값을 반환합니다.
     */
    static getBiggerNumber(a: number, b: number): number;
    /**
     *
     * @param a         비교할 숫자입니다.
     * @param b         비교할 숫자입니다.
     * @description     a와 b 중 더 작은 값을 반환합니다.
     */
    static getSmallerNumber(a: number, b: number): number;
}
export { Angle, Random, Compare };
