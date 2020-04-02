import Matter from 'matter-js'
import View from '@/View/View'
import PhysicsCollision from './ScenePhysicsCollision'

interface Gravity {
    x: number
    y: number
    scale: number
}

class ScenePhysics {
    static readonly DefaultGravity: Gravity = { x: 0, y: 0.98, scale: 1 }
    private table: Map<Matter.Body, View> = new Map
    readonly collision: PhysicsCollision = new PhysicsCollision
    private runner: Matter.Runner = Matter.Runner.create()
    private engine: Matter.Engine = Matter.Engine.create()
    readonly world: Matter.World = this.engine.world

    /**
     * 
     * @param table     업데이트할 물리객체의 목록을 담은 해시테이블입니다.
     * @description     배열을 순회하면서 렌더링을 시작합니다.
     */
    static updateRender(table: Map<Matter.Body, View>): void {
        for (const view of table.values()) {
            if (Object.prototype.hasOwnProperty.call(view.component, 'physics'))
                view.component.physics.update()
        }
    }

    /**
     * 
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param object    Matter.Body 인스턴스입니다.
     * @param body      View 인스턴스입니다.
     * @description     물리 시뮬레이터 해쉬테이블에 Matter.Body 인스턴스와 View 인스턴스를 키와 값의 쌍으로 삽입합니다.
     */
    static addObjectToTable(table: Map<Matter.Body, View>, object: Matter.Body, body: View): void {
        table.set(object, body)
    }

    /**
     * 
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param object    Matter.Body 인스턴스입니다.
     * @description     물리 시뮬레이터 해쉬테이블에 있는 Matter.Body 인스턴스를 제거합니다.
     */
    static dropObjectFromTable(table: Map<Matter.Body, View>, object: Matter.Body): void {
        table.delete(object)
    }

    /**
     * 
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param pairs     충돌을 받은 인스턴스의 정보를 가지고 있는 배열입니다.
     */
    static onCollisionStart(table: Map<Matter.Body, View>, pairs: Matter.IPair[]): void {
        for (const pair of pairs) {
            const { bodyA, bodyB } = pair
            const A: View | undefined = table.get(bodyA)
            const B: View | undefined = table.get(bodyB)
            if (A && B) {
                A.emit('collisionStart', B)
                B.emit('collisionStart', A)
            }
        }
    }

    /**
     * 
     * @param table     Matter.Body 인스턴스를 키로 가지는 해시테이블입니다.
     * @param pairs     충돌이 끝난 인스턴스의 정보를 가지고 있는 배열입니다.
     */
    static onCollisionEnd(table: Map<Matter.Body, View>, pairs: Matter.IPair[]): void {
        for (const pair of pairs) {
            const { bodyA, bodyB } = pair
            const A: View | undefined = table.get(bodyA)
            const B: View | undefined = table.get(bodyB)
            if (A && B) {
                A.emit('collisionEnd', B)
                B.emit('collisionEnd', A)
            }
        }
    }

    constructor() {
        // 이벤트를 핸들링합니다.
        Matter.Events.on(this.runner, 'afterUpdate', (): void => ScenePhysics.updateRender(this.table))
        Matter.Events.on(this.world, 'createPhysicsBody', (e: any): void => ScenePhysics.addObjectToTable(this.table, e.object, e.body))
        Matter.Events.on(this.world, 'destroyPhysicsBody', (e: any): void => ScenePhysics.dropObjectFromTable(this.table, e.object))
        Matter.Events.on(this.engine, 'collisionStart', (e: any): void => ScenePhysics.onCollisionStart(this.table, e.pairs))
        Matter.Events.on(this.engine, 'collisionEnd', (e: any): void => ScenePhysics.onCollisionEnd(this.table, e.pairs))

        // 중력을 설정합니다.
        this.engine.enableSleeping = false
        this.world.gravity = { ...ScenePhysics.DefaultGravity }
    }

    start(): void {
        Matter.Runner.run(this.runner, this.engine)
    }

    stop(): void {
        Matter.Runner.stop(this.runner)
    }
}

export default ScenePhysics