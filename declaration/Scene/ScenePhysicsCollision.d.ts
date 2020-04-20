import EventEmitter from 'eventemitter3';
declare class PhysicsCollision extends EventEmitter {
    static readonly DefaultCollider: string;
    readonly collisions: string[][];
    readonly colliders: string[];
    constructor();
    /**
     *
     * @param collider      대상 콜라이더 이름입니다.
     * @description         대상 콜라이더의 고유 충돌 범위를 가져옵니다.
     */
    getCollisionFilter(collider: string): number;
    private _addCollider;
    private _addCollision;
    private _deleteCollision;
    /**
     *
     * @param collider      새로운 콜라이더 이름입니다.
     * @description         새로운 콜라이더를 추가합니다. 이미 존재한다면 추가되지 않습니다.
     */
    addCollider(collider: string): number;
    /**
     *
     * @param colliders     서로 충돌할 콜라이더 이름입니다.
     * @description         인수로 넘긴 모든 콜라이더끼리 충돌합니다.
     */
    addCollision(...colliders: string[]): void;
    /**
     *
     * @param colliders     콜라이더 이름입니다.
     * @description         인수로 넘긴 콜라이더는 더 이상 충돌하지 않습니다.
     */
    deleteCollision(...colliders: string[]): void;
    /**
     *
     * @param colliders     콜라이더 이름입니다.
     * @description         인수로 넘긴 콜라이더끼리의 충돌필터값을 계산하여 반환합니다.
     */
    between(...colliders: string[]): number;
}
export default PhysicsCollision;
