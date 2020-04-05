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
import AssetLoader from '@/Asset/AssetLoader'
import App from '@/App/App'
import View from '@/View/View'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    private AssetLoader: typeof AssetLoader = AssetLoader

    /**
     * @description         주어진 값을 이미지 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    parseImageSize(v: string | number): string | number {
        const r = Number(v)
        return isNaN(r) ? v : `${r}px`
    }
}
</script>

<style lang="scss" scoped>
.image-background {
    background-repeat: no-repeat;
}
.image-fake {
    visibility: hidden;
}
</style>