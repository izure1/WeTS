declare class Definer {
    private configurable;
    private enumerable;
    private writable;
    private name;
    private value;
    constructor(name: string, value: any);
    /**
     *
     * @param name  새롭게 생성할 프로퍼티 이름입니다.
     * @param value  프로퍼티 이름에 삽입될 값입니다.
     */
    static create(name: string, value: any): Definer;
    /**
     *
     * @param v  이 변수를 삭제할 수 없도록 만듭니다.
     */
    seal(v: boolean): Definer;
    /**
     *
     * @param v  이 변수를 열거할 수 없도록 숨깁니다.
     */
    hidden(v: boolean): Definer;
    /**
     *
     * @param v  이 변수를 수정할 수 없도록 상수화합니다.
     */
    final(v: boolean): Definer;
    /**
     *
     * @param obj  이 변수를 부착합니다.
     */
    to(obj: object): void;
}
export default Definer;
