class Definer {

    private configurable: boolean = true
    private enumerable: boolean = true
    private writable: boolean = true
    private name: string
    private value: any
    
    constructor(name: string, value: any) {
        this.name = name
        this.value = value
    }

    /**
     * 
     * @param name  새롭게 생성할 프로퍼티 이름입니다.
     * @param value  프로퍼티 이름에 삽입될 값입니다.
     */
    static create(name: string, value: any): Definer {
        return new Definer(name, value)
    }

    /**
     * 
     * @param v  이 변수를 삭제할 수 없도록 만듭니다.
     */
    seal(v: boolean): Definer {
        this.configurable = !v
        return this
    }

    /**
     * 
     * @param v  이 변수를 열거할 수 없도록 숨깁니다.
     */
    hidden(v: boolean): Definer {
        this.enumerable = !v
        return this
    }

    /**
     * 
     * @param v  이 변수를 수정할 수 없도록 상수화합니다.
     */
    final(v: boolean): Definer {
        this.writable = !v
        return this
    }

    /**
     * 
     * @param obj  이 변수를 부착합니다.
     */
    to(obj: object): void {
        const { configurable, enumerable, writable } = this
        Object.defineProperty(obj, this.name, { configurable, enumerable, writable })
    }

}


export default Definer