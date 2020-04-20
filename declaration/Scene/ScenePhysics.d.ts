import Matter from 'matter-js';
import View from '../View/View';
import PhysicsCollision from './ScenePhysicsCollision';
interface Gravity {
    x: number;
    y: number;
    scale: number;
}
declare class ScenePhysics {
    static readonly DefaultGravity: Gravity;
    private table;
    readonly collision: PhysicsCollision;
    readonly runner: Matter.Runner;
    readonly engine: Matter.Engine;
    readonly world: Matter.World;
    /**
     *
     * @param table     업데이트할 물리객체의 목록을 담은 해시테이블입니다.
     * @description     배열을 순회하면서 렌더링을 시작합니다.
     */
    static updateRender(table: Map<Matter.Body, View>): void;
    /**
     *
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param object    Matter.Body 인스턴스입니다.
     * @param body      View 인스턴스입니다.
     * @description     물리 시뮬레이터 해쉬테이블에 Matter.Body 인스턴스와 View 인스턴스를 키와 값의 쌍으로 삽입합니다.
     */
    static addObjectToTable(table: Map<Matter.Body, View>, object: Matter.Body, body: View): void;
    /**
     *
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param object    Matter.Body 인스턴스입니다.
     * @description     물리 시뮬레이터 해쉬테이블에 있는 Matter.Body 인스턴스를 제거합니다.
     */
    static dropObjectFromTable(table: Map<Matter.Body, View>, object: Matter.Body): void;
    /**
     *
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param pairs     충돌을 받은 인스턴스의 정보를 가지고 있는 배열입니다.
     */
    static onCollisionStart(table: Map<Matter.Body, View>, pairs: Matter.IPair[]): void;
    /**
     *
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param pairs     충돌이 끝난 인스턴스의 정보를 가지고 있는 배열입니다.
     */
    static onCollisionEnd(table: Map<Matter.Body, View>, pairs: Matter.IPair[]): void;
    constructor();
    start(): void;
    stop(): void;
}
export default ScenePhysics;
