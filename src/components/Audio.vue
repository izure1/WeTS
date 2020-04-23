<template>
    <div ref="rootElement" />
</template>

<script lang="ts">
const path = require('path')
import { defineComponent, getCurrentInstance, Ref, ref, watch, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
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

const useHowlerSetting = () => {
    const HOWLER_TO_WORLD: number = 1 / 20
    const HOWLER_CONFIG: HowlerConfig = {
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0,
        maxDistance: 100,
        rolloffFactor: 1,
        refDistance: 1,
        distanceModel: 'inverse',
        panningModel: 'HRTF',
    }
    return { HOWLER_CONFIG, HOWLER_TO_WORLD }
}

const useAudio = () => {
    const EMPTY_SOUND: Howl = new Howl({
        src: 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==',
        format: 'audio/wav'
    })
    const audio: Ref<Promise<Howl>> = ref(Promise.resolve(EMPTY_SOUND))
    return { EMPTY_SOUND, audio }
}

export default defineComponent({
    props: {
        app: { type: App, required: true },
        scene: { type: View, required: true },
        body: { type: View, required: true },
    },
    setup(props): object {
        let intervalIndex: number | null = null
        const rootElement: Ref = ref()
        const { HOWLER_CONFIG, HOWLER_TO_WORLD } = useHowlerSetting()
        const { EMPTY_SOUND, audio } = useAudio()

        /**
         * @description         주어진 src를 통해 오디오를 새롭게 불러옵니다.
         */
        const loadAudio = (): Promise<Howl> => {
            return new Promise((resolve, reject): void => {
                const uri: string | null = props.body.component.audio.src
                if (!uri) {
                    resolve(EMPTY_SOUND)
                    return
                }
                const asset: Asset | null = AssetLoader.getAsset(uri)
                const src: string = asset ? asset.uri : uri
                const format: string = asset ? asset.mime.split('/')[1] : path.extname(src).split('.').pop()

                // 이미 오디오가 존재한다면 기존의 오디오를 삭제합니다.
                audio.value.then((audio: Howl): void => {
                    audio.unload()
                }).finally((): void => {
                    // 새로운 오디오를 생성합니다.
                    const audio: Howl = new Howl({ src, format })
                    audio.once('loaderror', reject)
                    audio.once('load', (e: Event): void => {
                        resolve(audio)
                        props.body.component.audio.emit('load', e)
                    })
                })
            })
        }

        /**
         * @param el        대상 HTMLElement 인스턴스입니다.
         * @description     대상 HTMLElement 인스턴스의 translate.z 좌표를 반환합니다.
         */
        const getComputedTranslateZ = (el: HTMLElement): number => {
            const transform: string = getComputedStyle(el).transform
            const mat: RegExpMatchArray | null = transform.match(/^matrix3d\((.+)\)$/)
            return mat ? ~~(mat[1].split(', ')[14]) : 0
        }

        /**
         * @description     현재 오디오의 위치에 따라 오디오 3D 효과를 변경합니다.
         */
        const observeAudioPosition = (): void => {
            intervalIndex = setInterval((): void => {
                audio.value.then((audio: Howl) => {
                    const el: HTMLElement = rootElement.value as HTMLElement
                    const app: App = props.app
                    if (!app.appElement) return

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
                        acc -= getComputedTranslateZ(body)
                        // 만일 Children 컴포넌트로 인해 자식 View 인스턴스도 존재한다면 카메라의 z좌표 만큼을 추가합니다.
                        const camera: Element | null = body.querySelector('.we-camera')
                        if (camera)
                            acc += getComputedTranslateZ((camera as HTMLElement))
                        return acc
                    }, 0)

                    x *= HOWLER_TO_WORLD
                    y *= HOWLER_TO_WORLD
                    z *= HOWLER_TO_WORLD

                    audio.pannerAttr(HOWLER_CONFIG)
                    audio.orientation(0, 0, 1, 0, 0, 0)
                    audio.pos(x, y, z)
                })
            }, props.body.component.audio.recaching)
        }

        const destroyObserver = (): void => {
            if (intervalIndex) clearInterval(intervalIndex)
        }


        /*
         *  오디오가 변경된 내용을 이곳에서 처리합니다.
         *  body.component.audio 컴포넌트의 데이터가 변경되었을 때, 이를 watch로 감지하여 실제 Howl 인스턴스 객체를 조작합니다.
         */

        watch(audio, (): void => {
            audio.value.then((audio: Howl): void => {
                const playbackRate: number = props.body.component.audio.playbackRate
                const volume: number = props.body.component.audio.volume
                const loop: boolean = props.body.component.audio.loop
                const muted: boolean = props.body.component.audio.muted
                audio.rate(playbackRate)
                audio.mute(muted)
                audio.loop(loop)
                audio.volume(volume)
            })
        })

        watch(() => props.body.component.audio.src, (): void => {
            audio.value = loadAudio()
        })

        watch(() => props.body.component.audio.loop, (): void => {
            audio.value.then((audio: Howl): void => {
                const loop: boolean = props.body.component.audio.loop
                audio.loop(loop)
            })
        })

        watch(() => props.body.component.audio.muted, (): void => {
            audio.value.then((audio: Howl): void => {
                const muted: boolean = props.body.component.audio.muted
                audio.mute(muted)
            })
        })

        watch(() => props.body.component.audio.playbackRate, (): void => {
            audio.value.then((audio: Howl): void => {
                const playbackRate: number = props.body.component.audio.playbackRate
                audio.rate(playbackRate)
            })
        })

        watch(() => props.body.component.audio.volume, (): void => {
            audio.value.then((audio: Howl): void => {
                const volume: number = props.body.component.audio.volume
                audio.volume(volume)
            })
        })

        onBeforeMount((): void => {
            // body.component.audio 컴포넌트에서 VueComponentInternalInstance 인스턴스를 사용할 수 있도록 만듭니다.
            WeComponent.attachVue(props.body.component.audio, getCurrentInstance())
            // 현재 src 값으로부터 Howl 오디오 인스턴스를 생성합니다.
            audio.value = loadAudio()
        })

        onMounted((): void => {
            // 스크린에 rootElement의 위치에 따라 오디오의 3D 효과를 변경하기 위해 감지를 시작합니다.
            observeAudioPosition()
        })

        onBeforeUnmount((): void => {
            // 오디오의 3D 효과변경 감지기를 중단합니다.
            destroyObserver()
            // 생성된 Howl 오디오 인스턴스를 파괴하여 메모리를 회수합니다.
            audio.value.then((audio: Howl): void => {
                audio.unload()
            })
        })

        return {
            rootElement, audio,
            loadAudio
        }
    }
})
</script>