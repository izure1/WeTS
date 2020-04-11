<template>
   <video
        :src="AssetLoader.getUri(body.component.video.src)"
        :width="parseVideoSize(body.component.video.width)"
        :height="parseVideoSize(body.component.video.height)"
        :controls="body.component.video.controls"
        :loop="body.component.video.loop"
        :autoplay="body.component.video.autoplay"
        :muted="body.component.video.muted" />
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import AssetLoader from '@/Asset/AssetLoader'
import App from '@/App/App'
import View from '@/View/View'
import WeComponent from '@/View/Component'

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    private readonly AssetLoader: typeof AssetLoader = AssetLoader
    private start: number = 0
    private video: Promise<HTMLVideoElement> = new Promise((resolve) => { this.setVideo = resolve })
    private setVideo!: (video: HTMLVideoElement) => void

    /**
     * @description         주어진 값을 비디오 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    private parseVideoSize(v: string | number): string | number {
        const r: number = Number(v)
        return isNaN(r) ? v : `${r}px`
    }

    @Watch('body.component.video.playbackRate')
    private async onChangePlaybackRate(): Promise<void> {
        if (!this.video) return
        const video: HTMLVideoElement = await this.video
        const playbackRate: number = this.body.component.video.playbackRate
        video.playbackRate = playbackRate
    }

    @Watch('body.component.video.volume')
    private async onChangeVolume(): Promise<void> {
        if (!this.video) return
        const video: HTMLVideoElement = await this.video
        const volume: number = this.body.component.video.volume
        video.volume = volume
    }

    created() {
        WeComponent.attachVue(this.body.component.video, this)
    }

    mounted() {
        this.setVideo!(this.$el as HTMLVideoElement)
        this.body.component.video.emit('load')
    }
}
</script>