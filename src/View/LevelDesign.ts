type Level = string[]

class LevelDesign {
    static readonly PersistentLevel: string = 'main';
    [key: string]: Level
    
    /**
     * 
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @param inheritLevels     해당 레벨을 상속받는 레벨들입니다.
     */
    static set(design: LevelDesign, name: string, inheritLevels: Level = []): void {
        design[name] = [...inheritLevels]
    }

    /**
     * 
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 가지고 있는지 여부를 반환합니다.
     */
    static has(design: LevelDesign, name: string): boolean {
        return Object.prototype.hasOwnProperty.call(design, name)
    }

    /**
     * 
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 가지고 있다면 레벨들을 배열로 반환합니다. 없다면 null을 반환합니다.
     */
    static get(design: LevelDesign, name: string): Level | null {
        return LevelDesign.has(design, name) ? design[name] : null
    }

    private static getRequiredSelf(design: LevelDesign, name: string, totalAcc: Set<string>): Set<string> {
        if (totalAcc.has(name))
            return totalAcc
        totalAcc.add(name)
        if (!LevelDesign.has(design, name))
            return totalAcc
        for (const level of LevelDesign.get(design, name)!)
            LevelDesign.getRequiredSelf(design, level, totalAcc)
        return totalAcc
    }

    /**
     * 
     * @param design            LevelDesign 인스턴스입니다.
     * @param name              해당 레벨 이름입니다.
     * @description             해당 레벨을 필요로 하는 모든 레벨들을 배열로 반환합니다.
     */
    static getRequireds(design: LevelDesign, name: string): Level {
        const dependencies = LevelDesign.getRequiredSelf(design, name, new Set)
        return [...dependencies].sort()
    }
}

export default LevelDesign