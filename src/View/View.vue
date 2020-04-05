<template>
    <div
        class="we-body"
        tabindex="0"
        v-if="isNeedFromScene(requiredLevels, body.level)" 
        :id="body.id" 
        :class="{
            'scene2d': scene.type === SCENE_2D,
            'scene3d': scene.type === SCENE_3D,
        }"
        :we-body-tag="body.tags.join(' ')"
        :we-body-size="sizeMax"
        :style="{
            backgroundColor: body.component.filter.backgroundColor,
            transition: `
                all
                ${body.component.transform.duration}ms
                ${body.component.transform.ease}
                ${body.component.transform.delay}ms`,
        }"

        @keydown="      emitUserInput"
        @keypress="     emitUserInput"
        @keyup="        emitUserInput"
        @mousedown="    emitUserInput"
        @mouseenter="   emitUserInput"
        @mouseleave="   emitUserInput"
        @mousemove="    emitUserInput"
        @mouseout="     emitUserInput"
        @mouseover="    emitUserInput"
        @mouseup="      emitUserInput"
        @mousewheel="   emitUserInput"
        @click="        emitUserInput"
        @contextmenu="  emitUserInput"
        @dblclick="     emitUserInput"
        @drag="         emitUserInput"
        @dragend="      emitUserInput"
        @dragenter="    emitUserInput"
        @dragleave="    emitUserInput"
        @dragover="     emitUserInput"
        @dragstart="    emitUserInput"
        @drop="         emitUserInput"
        @focus="        emitUserInput"

    >

        <!-- 
        현재 객체를 필터 처리 합니다.
        필터는 현재 객체의 컴포넌트 Element만 적용됩니다.
        filter 속성이 주어질 경우, 자식 Element는 transform-origin: preserve-3d 을 사용할 수 없기 때문입니다.
        -->
        <div
            class="we-components"
            :style="{
                cursor: body.component.filter.cursor,
                transition: `
                    all
                    ${body.component.filter.duration}ms
                    ${body.component.filter.ease}
                    ${body.component.filter.delay}ms`,
                filter: `
                    blur(${body.component.filter.blur}px)
                    brightness(${body.component.filter.brightness})
                    contrast(${body.component.filter.contrast})
                    grayscale(${body.component.filter.grayscale})
                    invert(${body.component.filter.invert})
                    opacity(${body.component.filter.opacity})
                    saturate(${body.component.filter.saturate})
                    sepia(${body.component.filter.sepia})`,
            }"
        >

            <!-- 
                화면에 시각적으로 보이는 컴포넌트를 이곳에 넣습니다.
                이 컴포넌트들은 position: static이므로, 위에서 아래로 순차대로 쌓입니다.
            -->
            <div class="we-components-visible">
                <component-text     v-if="  hasComponent('text')"        :app="app" :scene="scene" :body="body" />
                <component-html     v-if="  hasComponent('html')"        :app="app" :scene="scene" :body="body" />
                <component-image    v-if="  hasComponent('image')"       :app="app" :scene="scene" :body="body" />
                <component-video    v-if="  hasComponent('video')"       :app="app" :scene="scene" :body="body" />
                <component-rect     v-if="  hasComponent('rect')"        :app="app" :scene="scene" :body="body" />
            </div>

            <!-- 
                화면에 시각적으로 보이지 않는 컴포넌트를 이곳에 넣습니다.
            -->
            <div class="we-components-hidden">
                <component-physics  v-if="  hasComponent('physics')"     :app="app" :scene="scene" :body="body" />
                <component-audio    v-if="  hasComponent('audio')"       :app="app" :scene="scene" :body="body" />
                <component-particle v-if="  hasComponent('particle')"    :app="app" :scene="scene" :body="body" />
            </div>

        </div>

        <!-- Children 컴포넌트에 있는 하위 자식 객체를 추가합니다. -->
        <div
            class="we-camera"
            v-if="hasComponent('children')"
            :class="{
                'scene2d': scene.type === SCENE_2D,
                'scene3d': scene.type === SCENE_3D,
            }"
            :style="{ 
                transform: `translate3d(
                    ${-body.component.camera.x}px,
                    ${body.component.camera.y}px,
                    ${body.component.camera.z}px) 
                    rotateX(${-body.component.camera.rotateX}deg)
                    rotateY(${body.component.camera.rotateY}deg)
                    rotateZ(${-body.component.camera.rotateZ}deg)`
            }"
        >
            <!-- 파티클을 보여줍니다. 이 기능은 물리효과를 필요로 하기 때문에, 객체의 타입이 씬일 경우에만 동작합니다. -->
            <!-- <particle-renderer
                v-if="isScene"
                :emitters="body.particle.emitters"
                :app="app"
                :scene="scene"
                :body="body"
            /> -->
            <!-- 자식 객체를 보여줍니다 -->
            <we-body
                v-for="children in body.component.children.lists"
                :key="children.uid"
                :app="app"
                :scene="body"
                :body="children"
                :requiredLevels="LevelDesign.getRequireds(body.levelDesign, body.level)"
                @onchangesize="onChangeSize" />
        </div>

    </div>
</template>

<script lang="ts">
import ResizeObserver from 'resize-observer-polyfill'
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Compare } from '@/Utils/MathUtil'
import LevelDesign from '@/View/LevelDesign'
import App from '@/App/App'
import View from '@/View/View'
import WeComponent from '@/View/Component'
import Scene from '../Scene/Scene'
import { SceneType } from '@/Scene/SceneType'
import ParticleRenderer from '@/Components/ParticleRenderer.vue'
import ComponentImage from '@/Components/Image.vue'
import ComponentVideo from '@/Components/Video.vue'
import ComponentAudio from '@/Components/Audio.vue'
import ComponentPhysics from '@/Components/Physics.vue'
import ComponentRect from '@/Components/Rect.vue'
import ComponentText from '@/Components/Text.vue'
import ComponentHtml from '@/Components/Html.vue'

type Vector = [number, number]

@Component({
    name: 'WeBody',
    components: {
        ParticleRenderer,
        ComponentImage,
        ComponentVideo,
        ComponentAudio,
        ComponentPhysics,
        ComponentRect,
        ComponentText,
        ComponentHtml,
    }
})
export default class WeBody extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    @Prop() private requiredLevels!: string[]

    private LevelDesign: typeof LevelDesign = LevelDesign
    private updateRequestId: string | null = null
    private sizeObserver: ResizeObserver | null = null
    private sizeSelf: Vector = [0, 0]
    private sizeChild: Vector = [0, 0]
    private sizeMax: Vector = [0, 0]
    private SCENE_2D: number = SceneType.Scene2D
    private SCENE_3D: number = SceneType.Scene3D

    get centerPointX(): number {
        const transform: WeComponent = this.body.component.transform
        return transform.x - (this.sizeSelf[0] / 2)
    }

    get centerPointY(): number {
        const transform: WeComponent = this.body.component.transform
        return -transform.y - (this.sizeSelf[1] / 2)
    }

    get isScene(): boolean {
        return this.body instanceof Scene
    }

    /**
     * @description     ResizeObserver 인스턴스를 만듭니다. 이 View 인스턴스가 mounted 된 시점에 생성되며, 컴포넌트로 인한 크기 변화가 일어났을 경우, 이를 감지하여 상위 View 인스턴스로 전달합니다.
     */
    private startResizeObserve(): void {
        if (!(this.$el instanceof HTMLElement)) return
        const onResize: ResizeObserverCallback = (): void => {
            if (!(this.$el instanceof HTMLElement)) return
            const style: CSSStyleDeclaration = getComputedStyle(this.$el)
            const x: number = parseFloat(style.width)
            const y: number = parseFloat(style.height)
            this.sizeSelf = [x, y]
            this.$emit('onchangesize', this.sizeSelf)
        }
        this.sizeObserver = new ResizeObserver(onResize)
        this.sizeObserver.observe(this.$el)
    }

    /**
     * @description     ResizeObserver 인스턴스를 파괴하여 메모리를 회수합니다.
     */
    private destroyResizeObserve(): void {
        if (this.sizeObserver instanceof ResizeObserver) this.sizeObserver.disconnect()
        this.sizeObserver = null
    }

    /**
     * @description     View 인스턴스의 라이프사이클을 시작합니다.
     */
    private startBodyCycle(): void {
        this.body.cycleStart()
        this.updateRequestId = this.body.cycleUpdate()
    }

    /**
     * @description     View 인스턴스의 라이프사이클을 파괴합니다.
     */
    private destroyBodyCycle(): void {
        if (this.updateRequestId && this.body)
            this.body.cycleDestroy(this.updateRequestId)
    }

    /**
     * @description     주어진 값을 이용하여 객체의 좌표를 렌더링합니다.
     */
    private translate(): void {
        if (!this.$el) return
        const el: HTMLElement = this.$el as HTMLElement
        const x: number = this.centerPointX
        const y: number = this.centerPointY
        const z: number = -this.body.component.transform.z
        const rx: number = this.body.component.transform.rotateX
        const ry: number = -this.body.component.transform.rotateY
        const rz: number = this.body.component.transform.rotateZ
        const scale: number = this.body.component.transform.scale
        el.style.transform = `translate3d(
            ${x}px,
            ${y}px,
            ${z}px)
            rotateX(${rx}deg)
            rotateY(${ry}deg)
            rotateZ(${rz}deg)
            scale(${scale})
        `
    }

    /**
     * @description     사용자 입력 이벤트를 발생시킵니다.
     */
    private emitUserInput(e: Event): void {
        this.body.emit(e.type, e)
    }

    private onChangeSize(size: Vector) {
        this.sizeChild = size
    }

    /**
     * @description     View 인스턴스의 크기가 변경되었을 때, 다시 크기를 계산하여 상위 View 인스턴스로 전달합니다.
     */
    private calcSizeMax() {
        const x: number = Compare.getBiggerNumber(this.sizeSelf[0], this.sizeChild[0])
        const y: number = Compare.getBiggerNumber(this.sizeSelf[1], this.sizeChild[1])
        this.sizeMax = [x, y]
        this.$emit('onchangesize', this.sizeMax)
        this.translate()
        this.body.emit('body-size-update', this.sizeMax)
    }

    private isNeedFromScene(requiredLevels: string[], current: string): boolean {
        return requiredLevels.indexOf(current) !== -1
    }

    private hasComponent(name: string): boolean {
        return Object.prototype.hasOwnProperty.call(this.body.component, name)
    }

    @Watch('sizeSelf')
    private onChangeSelfSize() {
        this.calcSizeMax()
    }

    @Watch('sizeChild')
    private onChangeSelfChild() {
        this.calcSizeMax()
    }

    @Watch('body.component.transform', { deep: true })
    private onChangeTransform() {
        this.translate()
    }

    @Watch('body.physics.collision.collisions', { deep: true })
    private onChangeCollision() {
        if (this.body instanceof Scene) {
            const collisions: string[][] = this.body.physics.collision.collisions
            const updatedPairs: string[] = collisions[collisions.length - 1]
            this.body.physics.collision.emit('collision-update', updatedPairs)
        }
    }

    mounted() {
        this.startResizeObserve()
        this.startBodyCycle()
    }

    beforeDestroy() {
        this.destroyResizeObserve()
        this.destroyBodyCycle()
    }
}
</script>

<style lang="scss" scoped>
.we-camera,
.we-body {
    position: absolute;
    outline: none;

    &.scene3d {
        top: 50%;
        left: 50%;
        transform-style: preserve-3d;
    }
}

.we-components {
    position: relative;
}

.we-components-hidden {
    width: 0;
    height: 0;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>