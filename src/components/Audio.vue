<template>
    <div />
</template>

<script lang="ts">
const path = require('path')
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Howl } from 'howler'
import Asset from '../Asset/Asset'
import AssetLoader from '../Asset/AssetLoader'
import Searcher from '../Utils/Searcher'
import App from '../App/App'
import View from '../View/View'
import WeComponent from '../View/Component'

interface HowlerConfig {
    coneInnerAngle: number
    coneOuterAngle: number
    coneOuterGain: number
    maxDistance: number
    rolloffFactor: number
    refDistance: number
    distanceModel: 'inverse' | 'linear'
    panningModel: 'HRTF' | 'equalpower'
}

@Component
export default class VueComponent extends Vue {
    @Prop() private app!: App
    @Prop() private scene!: View
    @Prop() private body!: View
    private static readonly EmptySound = new Howl({
        src: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==',
        format: 'audio/wav'
    })
    private audio: Promise<Howl> = Promise.resolve(VueComponent.EmptySound)
    private intervalIndex: number | null = null
    private readonly AssetLoader: typeof AssetLoader = AssetLoader
    private readonly HowlerToWorld: number = 1 / 20
    private readonly HowlerConfig: HowlerConfig = {
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0,
        maxDistance: 100,
        rolloffFactor: 1,
        refDistance: 1,
        distanceModel: 'inverse',
        panningModel: 'HRTF',
    }

    /**
     * @description         주어진 src를 통해 오디오를 새롭게 불러옵니다.
     */
    private loadAudio(): Promise<Howl> {
        return new Promise((resolve, reject): void => {
            const uri: string | null = this.body.component.audio.src
            if (!uri) {
                resolve(VueComponent.EmptySound)
                return
            }
            const asset: Asset | null = AssetLoader.getAsset(uri)
            const src: string = asset ? asset.uri : uri
            const format: string = asset ? asset.mime.split('/')[1] : path.extname(src).split('.').pop()

            // 이미 오디오가 존재한다면 기존의 오디오를 삭제합니다.
            this.audio.then((audio: Howl): void => {
                audio.unload()
            }).finally((): void => {
                // 새로운 오디오를 생성합니다.
                const audio: Howl = new Howl({ src, format })
                audio.once('loaderror', reject)
                audio.once('load', (e: Event): void => {
                    resolve(audio)
                    this.body.component.audio.emit('load', e)
                })
            })
        })
    }

    /**
     * @param el        대상 HTMLElement 인스턴스입니다.
     * @description     대상 HTMLElement 인스턴스의 translate.z 좌표를 반환합니다.
     */
    private getComputedTranslateZ(el: HTMLElement): number {
        const transform: string = getComputedStyle(el).transform
        const mat: RegExpMatchArray | null = transform.match(/^matrix3d\((.+)\)$/)
        return mat ? ~~(mat[1].split(', ')[14]) : 0
    }

    /**
     * @description     현재 오디오의 위치에 따라 오디오 3D 효과를 변경합니다.
     */
    private observeAudioPosition(): void {
        this.intervalIndex = setInterval((): void => { 
            this.audio.then((audio: Howl) => {
                const el: HTMLElement = this.$el as HTMLElement
                const app: App = this.app
                if (!app.appElement)
                    return

                // app의 위치와 현재 $el의 위치를 모니터로부터 받아옵니다.
                const appStyle: CSSStyleDeclaration = getComputedStyle(app.appElement)
                const appRect: DOMRect = app.appElement.getBoundingClientRect()
                const elRect: DOMRect = el.getBoundingClientRect()

                // app의 위치와 $el의 상대위치를 받아옵니다.
                const gapX: number = elRect.x - appRect.x
                const gapY: number = elRect.y - appRect.y
                const centerX: number = parseFloat(appStyle.width) / 2
                const centerY: number = parseFloat(appStyle.height) / 2
                let x: number = gapX - centerX
                let y: number = centerY - gapY

                // 현재 객체의 z좌표를 계산하기 위해 객체의 상위 HTMLElement 인스턴스를 모두 구해 배열에 담습니다.
                let bodys: HTMLElement[] = []
                let body: HTMLElement | null = el
                do {
                    body = Searcher.getParentElementFromChildren(body)
                    if (!body) break
                    bodys.push(body)
                } while (body.classList.contains('we-body'))

                // 이후 HTMLELement 인스턴스의 z좌표를 누산기로 계산하여 최종 z좌표를 얻어냅니다.
                let z: number = bodys.reduce((acc: number, body: HTMLElement): number => {
                    acc -= this.getComputedTranslateZ(body)
                    // 만일 Children 컴포넌트로 인해 자식 View 인스턴스도 존재한다면 카메라의 z좌표 만큼을 추가합니다.
                    const camera: Element | null = body.querySelector('.we-camera')
                    if (camera)
                        acc += this.getComputedTranslateZ((camera as HTMLElement))
                    return acc
                }, 0)

                x *= this.HowlerToWorld
                y *= this.HowlerToWorld
                z *= this.HowlerToWorld

                audio.pannerAttr(this.HowlerConfig)
                audio.orientation(0, 0, 1, 0, 0, 0)
                audio.pos(x, y, z)
            })
        }, this.body.component.audio.recaching)
    }

    private destroyObserver(): void {
        if (this.intervalIndex)
            clearInterval(this.intervalIndex)
    }

    @Watch('audio')
    private onChangeAudio(): void {
        this.audio.then((audio: Howl): void => {
            const playbackRate: number = this.body.component.audio.playbackRate
            const volume: number = this.body.component.audio.volume
            const loop: boolean = this.body.component.audio.loop
            const muted: boolean = this.body.component.audio.muted
            audio.rate(playbackRate)
            audio.mute(muted)
            audio.loop(loop)
            audio.volume(volume)
        })
    }

    @Watch('body.component.audio.src')
    private onChangeAudioSrc(): void {
        this.audio = this.loadAudio()
    }

    @Watch('body.component.audio.loop')
    private onChangeAudioLoop(): void {
        this.audio.then((audio: Howl): void => {
            const loop: boolean = this.body.component.audio.loop
            audio.loop(loop)
        })
    }

    @Watch('body.component.audio.muted')
    private onChangeAudioMuted(): void {
        this.audio.then((audio: Howl): void => {
            const muted: boolean = this.body.component.audio.muted
            audio.mute(muted)
        })
    }

    @Watch('body.component.audio.playbackRate')
    private onChangeAudioPlaybackRate(): void {
        this.audio.then((audio: Howl): void => {
            const playbackRate: number = this.body.component.audio.playbackRate
            audio.rate(playbackRate)
        })
    }

    @Watch('body.component.audio.volume')
    private onChangeAudioVolume(): void {
        this.audio.then((audio: Howl): void => {
            const volume: number = this.body.component.audio.volume
            audio.volume(volume)
        })
    }

    created() {
        WeComponent.attachVue(this.body.component.audio, this)
        this.audio = this.loadAudio()
    }

    mounted() {
        this.observeAudioPosition()
    }

    beforeDestroy() {
        Promise.resolve().then(async (): Promise<void> => {
            this.destroyObserver()
            this.audio.then((audio: Howl): void => {
                audio.unload()
            })
        })
    }
}
</script>