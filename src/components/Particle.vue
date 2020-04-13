<template>
    <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Matter from 'matter-js'
import * as MatterExtra from '@/Utils/MatterExtra'
import AssetLoader from '@/Asset/AssetLoader'
import ArrayExtra from '@/Utils/ArrayExtra'
import Pairs from '@/Utils/Pairs'
import Tick from '@/Utils/Tick'
import { Random } from '@/Utils/MathUtil'
import { ImageSize } from '@/Utils/SizeCalculator'
import ParticleBody from '@/Particle/ParticleBody'
import ParticleOption from '@/Particle/ParticleOption'
import Particle from '@/Particle/Particle'
import App from '@/App/App'
import Scene from '@/Scene/Scene'
import View from '@/View/View'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: Scene
    @Prop() private body!: View
    private particles: ParticleBody[] = []
    private updateIntervalId: string | null = null
    private collision: number = 0

    /**
     * @description         파티클 입자를 생성합니다.
     */
    private async add(): Promise<void> {
        // TODO
        // 1. component.transform.z 값에 따라서 파티클 객체의 z좌표 역시 달라져야함
        // 4. 물리 객체에 콜라이더 설정을 해야함. 콜라이더는 WeJS.View의 tag 컴포넌트를 이용하도록 함. 파티클 객체는 tag 컴포넌트의 값을 상속받음.
        const x: number = this.body.component.transform.x
        const y: number = this.body.component.transform.y
        //const z: number = this.body.component.transform.z

        const src: string           = this.body.component.particle.src
        const start: number         = this.body.component.particle.start
        const end: number           = this.body.component.particle.end
        const duration: number      = this.body.component.particle.duration
        const frictionAir: number   = this.body.component.particle.frictionAir
        const perspective: number   = this.body.component.particle.perspective
        const speed: number         = this.body.component.particle.speed

        const assetUri: string      = AssetLoader.getUri(src)
        const assetSize             = await ImageSize.calc(assetUri)
        const width: number         = assetSize.width
        const height: number        = assetSize.height

        const setting: ParticleOption = { src, start, end, duration, frictionAir, perspective }
        const particle: Particle = new Particle(width, height, perspective)
        Object.assign(particle, setting)

        const id: string        = Random.shortid()
        const forceX: number    = Random.plusMinus() * Random.between(0, speed)
        const forceY: number    = Random.plusMinus() * Random.between(0, speed)

        const object: Matter.Body = Matter.Bodies.rectangle(x, -y, width, height)
        const info: ParticleBody = { id, particle, object }

        // 매 프레임마다 파티클을 업데이트합니다.
        const update = (): void => {
            particle.update(16)
            MatterExtra.Body.changeSize((particle.scale * width), (particle.scale * height), object)
        }

        // 파티클 물리 객체에 이벤트를 추가하고 월드에 적용합니다.
        // 이후에 힘을 가합니다.
        Matter.Events.on(this.scene.physics.runner, 'afterUpdate', update)
        Matter.World.add(this.scene.physics.world, object)
        Matter.Body.applyForce(object, Matter.Vector.create(x, y), Matter.Vector.create(forceX, forceY))

        // 객체의 속성을 설정합니다.
        Matter.Body.setInertia(object, Number.POSITIVE_INFINITY)
        object.frictionAir = frictionAir
        object.collisionFilter.category = this.collision

        // 파티클의 생존주기가 끝나면 파티클을 월드에서 삭제합니다.
        particle.on('particle-life-end', (): void => {
            Matter.Events.off(this.scene.physics.runner, 'afterUpdate', update)
            Matter.World.remove(this.scene.physics.world, object)
            ArrayExtra.delete(this.particles, info)
        })

        ArrayExtra.add(this.particles, info)
    }

    /**
     * @description         파티클 에미팅을 활성화합니다.
     */
    private generate(): void {
        this.stop()
        const interval: number = this.body.component.particle.interval
        this.updateIntervalId = Tick.request((): void => {
            const quantity: number = this.body.component.particle.quantity
            for (let i = 0; i < quantity; i++)
                this.add()
        }, interval)
    }

    /**
     * @description         파티클 생성을 중지합니다.
     */
    private stop(): void {
        if (this.updateIntervalId)
            Tick.cancelRequest(this.updateIntervalId)
    }

    /**
     * @description         콜라이더를 추가하고, 관련된 모든 충돌 필터값을 받아와 업데이트합니다.
     */
    private setCollider(): void {
        // 모든 콜라이더를 추가합니다.
        const colliders: string[] = this.body.component.particle.colliders

        // 모든 콜라이더를 추가합니다.
        for (const collider of colliders)
            this.scene.physics.collision.addCollider(collider)

        // 등록된 콜라이더를 순회하여 관련있는 모든 콜라이더를 받아옵니다.
        const all: string[] = Pairs.getOr(this.scene.physics.collision.collisions, ...colliders)
        // 관련 있는 모든 콜라이더로부터 충돌 필터값을 계산합니다.
        this.collision = this.scene.physics.collision.between(...all)
    }

    /**
     * @description         콜라이더가 추가되어 콜리전 충돌 필터값이 변경되면, 파티클의 모든 물리 객체의 충돌 필터값을 업데이트합니다.
     */
    private updateCollision(): void {
        for (const { object } of this.particles)
            object.collisionFilter.category = this.collision
    }

    @Watch('body.component.particle', { deep: true })
    private onChangeComponentParticle(): void {
        this.stop()
        this.generate()
        this.setCollider()
    }

    @Watch('collision')
    private onChangeCollision(): void {
        this.updateCollision()
    }

    created() {
        ArrayExtra.add(this.scene.particle.emitters, this.particles)
        this.scene.physics.collision.on('collision-update', this.setCollider)
        this.generate()
        this.setCollider()
    }

    beforeDestroy() {
        ArrayExtra.clear(this.particles)
        ArrayExtra.delete(this.scene.particle.emitters, this.particles)
        this.scene.physics.collision.off('collision-update', this.setCollider)
        this.stop()
    }
}
</script>