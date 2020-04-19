declare class PairsManager {
    /**
     *
     * @param pairLists 초기값입니다. 페어들을 배열을 매개변수로 넘깁니다.
     * @description     새로운 페어 목록을 만들어 반환합니다.
     */
    static create(...pairLists: string[][]): string[][];
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      서로 관련을 가지는 추가할 문자열입니다.
     * @description     서로 관련 있는 문자열을 매개변수로 넘겨 페어로 지정합니다.
     */
    static add(pairs: string[][], ...keys: string[]): string[][];
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @description     Pairs 인스턴스에 담긴 모든 문자열을 페어로 반환합니다.
     */
    static all(pairs: string[][]): string[];
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는 페어를 반환합니다.
     */
    static get(pairs: string[][], u: string): string[];
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는지 여부를 반환합니다.
     */
    static has(pairs: string[][], u: string): boolean;
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     페어가 대상 문자열을 포함하고 있다면 문자열을 삭제하고, 해당 페어를 반환합니다. 어떤 페어도 대상 문자열을 가지고 있지 않다면 null을 반환합니다.
     */
    static delete(pairs: string[][], u: string): string[] | null;
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param u         대상 문자열입니다.
     * @description     대상 문자열을 포함하고 있는 페어를 페어 목록에서 삭제합니다.
     */
    static drop(pairs: string[][], u: string): void;
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @description     페어 목록을 모두 제거하여 초기화합니다.
     */
    static clear(pairs: string[][]): void;
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      대상 문자열입니다.
     * @description     대상 문자열을 모두 포함하고 있는 페어를 반환합니다.
     */
    static getAnd(pairs: string[][], ...keys: string[]): string[];
    /**
     *
     * @param pairs     Pairs 인스턴스입니다.
     * @param keys      대상 문자열입니다.
     * @description     대상 문자열 중 한개라도 포함하고 있는 페어들의 모든 문자열을 페어로 반환합니다.
     */
    static getOr(pairs: string[][], ...keys: string[]): string[];
}
export default PairsManager;
