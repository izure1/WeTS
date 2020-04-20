declare class LevelDesign {
    static readonly PersistentLevel: string;
    [key: string]: string[];
    /**
     *
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @param inheritLevels     해당 레벨을 상속받는 레벨들입니다.
     */
    static set(design: LevelDesign, name: string, inheritLevels?: string[]): void;
    /**
     *
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 가지고 있는지 여부를 반환합니다.
     */
    static has(design: LevelDesign, name: string): boolean;
    /**
     *
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 가지고 있다면 레벨들을 배열로 반환합니다. 없다면 null을 반환합니다.
     */
    static get(design: LevelDesign, name: string): string[] | null;
    private static getRequiredSelf;
    /**
     *
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 필요로 하는 모든 레벨들을 배열로 반환합니다.
     */
    static getRequireds(design: LevelDesign, name: string): string[];
}
export default LevelDesign;
