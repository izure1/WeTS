<template>
    <section
        class="wejs-app"
        tabindex="0"
        :style="{
            width: `${app.width}px`,
            height: `${app.height}px`,
            transform: `scale(${appScale})`
        }"
        
        @keydown="emit"
        @keypress="emit"
        @keyup="emit"
        @mousedown="emit"
        @mouseenter="emit"
        @mouseleave="emit"
        @mousemove="emit"
        @mouseout="emit"
        @mouseover="emit"
        @mouseup="emit"
        @mousewheel="emit"
        @click="emit"
        @contextmenu="emit"
        @dblclick="emit"
        @drag="emit"
        @dragend="emit"
        @dragenter="emit"
        @dragleave="emit"
        @dragover="emit"
        @dragstart="emit"
        @drop="emit"
        @focus="emit"

    >
        <we-body
            :app="app"
            :scene="app"
            :body="app"
            :requiredLevels="app.levelDesign.getRequired(app.level)"
            :style="{ perspective: `${app.perspective}px` }" />
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    @Prop() private app!: App
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