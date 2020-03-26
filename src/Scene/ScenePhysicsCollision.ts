import EventEmitter from 'eventemitter3'
import ArrayExtra from '@/Utils/ArrayExtra.js'
import Pairs from '@/Utils/Pairs.js'

class PhysicsCollision extends EventEmitter {
    static DefaultCollider: string = 'default'
    private collisions: string[][]
    private colliders: string[]

    constructor() {
        super()
        this.collisions = Pairs.create()
        this.colliders = []
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

    between(...colliders: string[]): number {
        // const filters: number[] = colliders.map((collider: string) => this.addCollider(collider))
        // const filter: number = filters.reduce((a: number, b: number) => (a | b), (filters || []))
        // return filter
        return colliders
            .map((collider: string) => this.addCollider(colider))
            .reduce((a: number, b: number): number => (a | b), (colliders || []))
    }
}