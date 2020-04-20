import EventEmitter from 'eventemitter3'
import ArrayExtra from '../Utils/ArrayExtra'
import Pairs from '../Utils/Pairs'

class PhysicsCollision extends EventEmitter {
    static readonly DefaultCollider: string = 'default'
    readonly collisions: string[][] = Pairs.create()
    readonly colliders: string[] = []

    constructor() {
        super()
        ArrayExtra.add(this.colliders, PhysicsCollision.DefaultCollider)
    }

    /**
     * 
     * @param collider      대상 콜라이더 이름입니다.
     * @description         대상 콜라이더의 고유 충돌 범위를 가져옵니다.
     */
    getCollisionFilter(collider: string): number {
        const i: number = this.colliders.indexOf(collider)
        return i !== -1 ? Math.pow(2, i) : 0
    }

    private _addCollider(collider: string): void {
        ArrayExtra.add(this.colliders, collider)
    }

    private _addCollision(...colliders: string[]): void {
        Pairs.add(this.collisions, ...colliders)
    }

    private _deleteCollision(collider: string): void {
        Pairs.delete(this.collisions, collider)
    }

    /**
     * 
     * @param collider      새로운 콜라이더 이름입니다.
     * @description         새로운 콜라이더를 추가합니다. 이미 존재한다면 추가되지 않습니다.
     */
    addCollider(collider: string): number {
        if (this.colliders.length > 32)
            throw 'Collider there are up to 32 available.'
        this._addCollider(collider)
        this.emit('add-collider')
        return this.getCollisionFilter(collider)
    }

    /**
     * 
     * @param colliders     서로 충돌할 콜라이더 이름입니다.
     * @description         인수로 넘긴 모든 콜라이더끼리 충돌합니다.
     */
    addCollision(...colliders: string[]): void {
        for (const collider of colliders)
            this.addCollider(collider)
        this._addCollision(...colliders)
        this.emit('add-collision')
    }

    /**
     * 
     * @param colliders     콜라이더 이름입니다.
     * @description         인수로 넘긴 콜라이더는 더 이상 충돌하지 않습니다.
     */
    deleteCollision(...colliders: string[]): void {
        for (const collider of colliders)
            this._deleteCollision(collider)
        this.emit('delete-collision')
    }

    /**
     * 
     * @param colliders     콜라이더 이름입니다.
     * @description         인수로 넘긴 콜라이더끼리의 충돌필터값을 계산하여 반환합니다.
     */
    between(...colliders: string[]): number {
        if (!colliders.length)
            return 0
        const initialValue: number = this.getCollisionFilter(colliders[0])
        return colliders
            .map((collider: string) => this.addCollider(collider))
            .reduce((a: number, b: number): number => (a | b), initialValue)
    }
}

export default PhysicsCollision