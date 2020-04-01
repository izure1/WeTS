<template>
    <div
        :style="{
            backgroundImage: `url(${AssetLoader.getUri(body.component.image.src)})`,
            backgroundSize: `
                ${parseImageSize(body.component.image.width)}
                ${parseImageSize(body.component.image.height)}`,
            transition: `
                all
                ${body.component.image.duration}ms
                ${body.component.image.ease}
                ${body.component.image.delay}ms`
        }"
        class="image-background">
    <img
        :src="AssetLoader.getUri(body.component.image.src)"
        :style="{ 
            width: parseImageSize(body.component.image.width),
            height: parseImageSize(body.component.image.height),
        }"
        class="image-fake" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import AssetLoader from '@/Asset/AssetLoader.js'
import App from '@/App/App.js'
import View from '@/View/View.js'

@Component
export default class Camera extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    private AssetLoader: typeof AssetLoader = AssetLoader

    parseImageSize(v: string | number): string | number {
        v = Number(v)
        return isNaN(v) ? v : `${v}px`
    }
}
</script>

<style lang="scss" scoped>
.image-fake {
    visibility: hidden;
}
</style>