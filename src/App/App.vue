<template>
    <section
        class="wejs-app"
        tabindex="0"
        ref="rootElement"
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
            :requiredLevels="Design.getRequireds(app.levelDesign, app.level)"
            :style="{ perspective: `${app.perspective}px` }" />
    </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import WeBody from '../View/View.vue'
import LevelDesign from '../View/LevelDesign'
import ResizeObserver from 'resize-observer-polyfill'
import screenfull from 'screenfull'
import WeApp from './App'

export default defineComponent({
    components: { WeBody },
    props: {
        app: { type: WeApp, required: true }
     },
    setup(props) {
        let resizeObserver: ResizeObserver | null = null
        const rootElement: Ref = ref()
        const Design: typeof LevelDesign = LevelDesign
        const appScale: Ref<number> = ref(1)

        /**
         * @description         사용자 입력 이벤트를 발생시킵니다.
         */
        const emitUserInput = (e: Event): void => {
            props.app!.emit(e.type, e)
        }

        /**
         * @description         스크린 크기가 변경되었을 때, 전체적인 앱의 크기를 재조정합니다.
         */
        const onScreenChange = (): void => {
            if (screenfull.isEnabled) {
                if (screenfull.isFullscreen) appScale.value = 1
            }
            else {
                const size: [number, number] = props.app.size
                const appWidth: number = size[0]
                const appHeight: number = size[1]
                const screenWidth: number = screen.width
                const screenHeight: number = screen.height
                const scaleX = screenWidth / appWidth
                const scaleY = screenHeight / appHeight
                appScale.value = scaleX > scaleY ? scaleX : scaleY
            }
        }

        onBeforeMount((): void => {
            resizeObserver = new ResizeObserver(onScreenChange)
        })

        onMounted((): void => {
            resizeObserver!.observe(rootElement.value)
        })

        onBeforeUnmount((): void => {
            if (resizeObserver) {
                resizeObserver.disconnect()
                resizeObserver = null
            }
        })

        return {
            Design, rootElement, appScale,
            emitUserInput, onScreenChange,
        }
    }
})
</script>

<style lang="scss" scoped>
.wejs-app {
    position: relative;
    overflow: hidden;
    user-select: none;
    outline: none;
}
</style>