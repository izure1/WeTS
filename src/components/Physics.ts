import Matter from 'matter-js'
import { Reservation } from './Reservation'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Physics
    friction: number = 1
    frictionAir: number = 0.01
    frictionStatic: number = 0.5
    restitution: number = 0.3
    isStatic: boolean = false
    isSensor: boolean = false
    fixedRotation: boolean = false
    readonly colliders: string[] = []

    constructor(data: ComponentData) {
        super(data)
    }

    /**
     * 
     * @param x         x좌표로 가할 힘의 세기
     * @param y         y좌표로 가할 힘의 세기
     * @description     이 객체에 x, y 좌표로 물리력을 가합니다.
     */
    applyForce(x: number, y: number): void {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            const vue: any = this.vue!
            const object: Matter.Body = vue.physicsObject
            const position: Matter.Vector = object.position
            const dot: Matter.Vector = Matter.Vector.create(position.x, -position.y)
            const force: Matter.Vector = Matter.Vector.create(x, -y)
            Matter.Body.applyForce(object, dot, force)
        })
    }

    /**
     * 
     * @param x         x좌표로 가할 속도
     * @param y         y좌표로 가할 속도
     * @description     이 객체에 x, y, 좌표로 속도를 지정합니다. 이 속도는 일시적인 것이므로, 꾸준히 가하지 않는다면 멈출 것입니다.
     */
    setVelocity(x: number, y: number): void {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            const vue: any = this.vue!
            const object: Matter.Body = vue.physicsObject
            const velocity: Matter.Vector = Matter.Vector.create(x, -y)
            Matter.Body.setVelocity(object, velocity)
        })
    }

    /**
     * 
     * @param velocity  회전할 속도
     * @description     이 객체에 회전할 속도를 지정합니다. 이 속도는 일시적인 것이므로, 꾸준히 가하지 않는다면 멈출 것입니다.
     */
    setAngularVelocity(velocity: number): void {
        Promise.resolve().then(async () => {
            await Component.waitAttached(this)
            const vue: any = this.vue!
            const object: Matter.Body = vue.physicsObject
            Matter.Body.setAngularVelocity(object, velocity)
        })
    }

    update(): void {
        const vue: any = this.vue
        vue?.translate()
    }
}