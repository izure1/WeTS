interface DefaultObjectCase {
    [key: string]: any;
}
declare class ObjectExtra extends Object {
    constructor(...params: any);
    /**
     *
     * @param target    검사할 오브젝트입니다.
     * @param sources   추가할 오브젝트입니다.
     * @description     검사할 오브젝트에 존재하는 프로퍼티만 추가할 오브젝트의 프로퍼티의 값으로 덮어씁니다.
     */
    static overwrite(target: DefaultObjectCase, ...sources: DefaultObjectCase[]): DefaultObjectCase;
}
export default ObjectExtra;
