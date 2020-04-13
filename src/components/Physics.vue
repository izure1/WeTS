<template>
    <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Matter from 'matter-js'
import * as MatterExtra from '@/Utils/MatterExtra'
import WeComponent from '@/View/Component'
import App from '@/App/App'
import Scene from '@/Scene/Scene'
import View from '@/View/View'
import PhysicsCollision from '@/Scene/ScenePhysicsCollision'
import Pairs from '@/Utils/Pairs'
import { Angle } from '../Utils/MathUtil'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: Scene
    @Prop() private body!: View
    private physicsObject: Matter.Body | null = null
    private tracking: boolean = true
    private bodySize: [number, number] = [0, 0]
    private scale: number = 1
    private inertia: number = 0
    private category: number = 0

    /**
     * @description     물리객체의 충돌필터값을 재설정합니다.
     */
    private setCollider(): void {
        // 자신의 콜라이더들과 연관된 모든 콜라이더를 배열로 받아와서,
        // collisions.between 메서드로 계산을 해야합니다.
        if (!this.physicsObject) return

        const collision: PhysicsCollision = this.scene.physics.collision
        const colliders: string[] = this.body.component.physics.colliders

        // 모든 콜라이더를 추가합니다.
        for (const collider of colliders)
            collision.addCollider(collider)

        // 등록된 콜라이더를 순회하여 관련있는 모든 콜라이더를 받아옵니다.
        const all: string[] = Pairs.getOr(collision.collisions, ...colliders)

        // 관련된 모든 콜라이더로부터 충돌 필터값을 계산합니다.
        this.physicsObject.collisionFilter.category = collision.between(...all)
    }

    /**
     * @description     객체의 크기가 변경되었을 때, bodySize 변수를 수정하여, @Watch 에서 해결합니다.
     */
    private onChangeSize(sizeMax: [number, number]): void {
        this.bodySize = sizeMax
    }

    /**
     * @description     물리객체의 회전여부를 지정합니다.
     */
    private setFixedRotation(): void {
        const fixedRotation: boolean = this.body.component.physics.fixedRotation
        if (!this.physicsObject) return
        if (fixedRotation) {
            this.inertia = this.physicsObject.inertia
            Matter.Body.setInertia(this.physicsObject, Number.POSITIVE_INFINITY)
        }
        else
            Matter.Body.setInertia(this.physicsObject, this.inertia)
    }

    /**
     * @description     물리객체의 마찰값을 지정합니다.
     */
    private setFriction(): void {
        if (!this.physicsObject) return
        const physics: WeComponent = this.body.component.physics
        const friction: number = physics.friction
        const frictionAir: number = physics.frictionAir
        const frictionStatic: number = physics.frictionStatic
        this.physicsObject.friction = friction
        this.physicsObject.frictionAir = frictionAir
        this.physicsObject.frictionStatic = frictionStatic
    }

    /**
     * @description     물리객체의 탄성력을 지정합니다.
     */
    private setRestitution(): void {
        if (!this.physicsObject) return
        const restitution: number = this.body.component.physics.restitution
        this.physicsObject.restitution = restitution
    }

    /**
     * @description     물리객체의 고정여부를 지정합니다.
     */
    private setStatic(): void {
        if (!this.physicsObject) return
        const isStatic: boolean = this.body.component.physics.isStatic
        Matter.Body.setStatic(this.physicsObject, isStatic)
    }

    private createPhysics(): void {
        // 크기에 오류가 있을 시 바디를 만들지 않습니다.
        if (this.bodySize.filter(t => isNaN(t)).length) return
        // 물리객체가 생성되어 있다면 새롭게 생성하지 않고, 크기만 조절합니다.
        if (this.physicsObject) {
            MatterExtra.Body.changeSize(this.bodySize[0], this.bodySize[1], this.physicsObject)
            return
        }
        // 새로운 물리객체를 생성합니다.
        else {
            const x: number = this.body.component.transform.x
            const y: number = this.body.component.transform.y
            const isStatic: boolean = this.body.component.physics.isStatic
            const isSensor: boolean = this.body.component.physics.isSensor

            this.physicsObject = Matter.Bodies.rectangle(x, -y, this.bodySize[0], this.bodySize[1], { isStatic, isSensor })

            // 만일 fixedRotation 값을 이용하여 inertia를 Infinity로 지정하였을 때, 다시 원래대로 돌려놓기 위한 임시값을 저장해둡니다.
            // 이는 fixedRotation 값을 false로 지정할 때, 이 값이 사용됩니다.
            this.inertia = this.physicsObject.inertia
            this.scale = this.body.component.transform.scale

            Matter.World.add(this.scene.physics.world, this.physicsObject)
            Matter.Events.trigger(this.scene.physics.world, 'createPhysicsBody', { object: this.physicsObject, body: this.body })

            this.setFriction()
            this.setRestitution()
            this.setFixedRotation()
            this.setCollider()
        }
    }

    /**
     * @description         물리 인스턴스를 파괴합니다.
     */
    private destroyPhysics(): void {
        if (this.physicsObject) {
            Matter.World.remove(this.scene.physics.world, this.physicsObject, true)
            Matter.Events.trigger(this.scene.physics.world, 'destroyPhysicsBody', { object: this.physicsObject })
            this.physicsObject = null
        }
    }

    /**
     * @description         물리객체의 transform 상태를 변경합니다. 이는 View 인스턴스의 transform 컴포넌트값을 수동으로 수정했을 때, 물리객체에 적용하는 메서드입니다.
     */
    private transform(): void {
        if (!this.physicsObject) return
        const transform: WeComponent = this.body.component.transform
        const x: number = transform.x
        const y: number = transform.y
        const rotateZ: number = transform.rotateZ
        const scale: number = transform.scale
        const vector: Matter.Vector = Matter.Vector.create(x, -y)
        const angle: number = Angle.degreeToRadian(rotateZ)
        const calced = scale / this.scale
        this.scale = scale
        Matter.Body.setPosition(this.physicsObject, vector)
        Matter.Body.setAngle(this.physicsObject, angle)
        Matter.Body.scale(this.physicsObject, calced, calced)
    }

    /**
     * @description         물리객체의 위치 변화에 따라, View 인스턴스의 transform 컴포넌트 값을 수정합니다.
     */
    private translate(): void {
        if (!this.physicsObject) return
        const position: Matter.Vector = this.physicsObject.position
        const x: number = position.x
        const y: number = position.y
        const transform: WeComponent = this.body.component.transform
        this.tracking = false
        transform.x = x
        transform.y = -y
        transform.rotateZ = Angle.radianToDegree(this.physicsObject.angle)
        this.$nextTick(() => { this.tracking = true })
    }

    /**
     * @description         View 인스턴스의 transform 컴포넌트를 직접 수정할 경우, 물리를 추적하지 않습니다.
     */
    @Watch('body.component.transform.x')
    private onChangeTransformX(): void {
        if (this.tracking)
            this.transform()
    }

    @Watch('body.component.transform.y')
    private onChangeTransformY(): void {
        if (this.tracking)
            this.transform()
    }

    @Watch('body.component.transform.rotateZ')
    private onChangeTransformRotateZ(): void {
        if (this.tracking)
            this.transform()
    }

    @Watch('body.component.transform.scale')
    private onChangeTransformScale(): void {
        this.transform()
    }

    @Watch('body.component.physics.type')
    private onChangePhysicsType(): void {
        this.setStatic()
    }

    @Watch('body.component.physics.friction')
    private onChangePhysicsFriction(): void {
        this.setFriction()
    }

    @Watch('body.component.physics.frictionAir')
    private onChangePhysicsFrictionAir(): void {
        this.setFriction()
    }

    @Watch('body.component.physics.frictionStatic')
    private onChangePhysicsFrictionStatic(): void {
        this.setFriction()
    }

    @Watch('body.component.physics.restitution')
    private onChangePhysicsRestitution(): void {
        this.setRestitution()
    }

    @Watch('body.component.physics.fixedRotation')
    private onChangePhysicsFixed(): void {
        this.setFixedRotation()
    }

    @Watch('body.component.physics.colliders')
    private onChangePhysicsColliders(): void {
        this.setCollider()
    }

    @Watch('bodySize')
    private onChangeBodysize(): void {
        this.createPhysics()
    }


    created(): void {
        this.scene.physics.collision.on('collision-update', this.setCollider)
        this.body.on('body-size-update', this.onChangeSize)
        WeComponent.attachVue(this.body.component.physics, this)
    }

    beforeDestroy(): void {
        this.destroyPhysics()
        this.scene.physics.collision.off('collision-update', this.setCollider)
        this.body.off('body-size-update', this.onChangeSize)
    }
}
</script>