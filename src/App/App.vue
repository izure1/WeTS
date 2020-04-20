<template>
    <section
        class="wejs-app"
        tabindex="0"
        :style="{
            width: `${app.width}px`,
            height: `${app.height}px`,
            transform: `scale(${appScale})`
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
        <we-body
            :app="app"
            :scene="app"
            :body="app"
            :requiredLevels="LevelDesign.getRequireds(app.levelDesign, app.level)"
            :style="{ perspective: `${app.perspective}px` }" />
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import WeBody from '../View/View.vue'
import LevelDesign from '../View/LevelDesign'
import ResizeObserver from 'resize-observer-polyfill'
import screenfull from 'screenfull'
import WeApp from './App'

@Component({
    components: { WeBody }
})
export default class App extends Vue {
    @Prop() private app!: WeApp
    private LevelDesign: typeof LevelDesign = LevelDesign
    private resizeObserver: ResizeObserver | null = null
    private appScale: number = 1

    /**
     * @description     사용자 입력 이벤트를 발생시킵니다.
     */
    private emitUserInput(e: Event): void {
        this.app.emit(e.type, e)
    }

    /**
     * @description     스크린 크기가 변경되었을 때, 전체적인 앱의 크기를 재조정합니다.
     */
    private onScreenChange(): void {
        if (screenfull.isEnabled) {
            if (screenfull.isFullscreen)
                this.appScale = 1
        }
        else {
            const size: [number, number] = this.app.size
            const appWidth: number = size[0]
            const appHeight: number = size[1]
            const screenWidth: number = screen.width
            const screenHeight: number = screen.height
            const scaleX = screenWidth / appWidth
            const scaleY = screenHeight / appHeight
            this.appScale = scaleX > scaleY ? scaleX : scaleY
        }
    }

    created() {
        this.resizeObserver = new ResizeObserver(this.onScreenChange)
    }

    mounted() {
        this.resizeObserver!.observe(this.$el)
    }

    beforeDestroy() {
        if (this.resizeObserver)
            this.resizeObserver!.disconnect()
        this.resizeObserver = null
    }
}
</script>

<style lang="scss" scoped>
.wejs-app {
    position: relative;
    overflow: hidden;
    user-select: none;
    outline: none;
}
</style>