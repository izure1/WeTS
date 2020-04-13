import Vue from 'vue'
import Scene from '@/Scene/Scene'
import Scene3d from '@/Scene/Scene3d'
import ArrayExtra from '@/Utils/ArrayExtra'
import Preloader from '@/Utils/Preloader'
import Sleep from '@/Utils/Sleep'
import screenfull from 'screenfull'
import App from './App.vue'

class WeApp extends Scene3d {
    private width: number = 800
    private height: number = 450
    private perspective: number = 100
    private app: Vue | null = null
    element: string | null = null

    constructor() {
        super()
    }

    get appElement(): Element | null {
        if (!this.app) return null
        return this.app.$el
    }

    get size(): [number, number] {
        return [this.width, this.height]
    }

    set size(v: [number, number]) {
        this.width = v[0]
        this.height = v[1]
    }

    async start(splashScene: Scene = new Scene): Promise<Vue> {
        const scenes: Scene[] = this.component.children.lists
        ArrayExtra.clear(scenes)
        ArrayExtra.add(scenes, splashScene)
        if (!this.element)
            throw 'You must first initialize the element property.'
        this.app = new Vue({
            el: this.element!,
            components: { App },
            template: '<App :app="app" />',
            data: {
                app: this
            }
        })

        await Preloader.waitElement(document)
        await Preloader.waitPreloads(this.lifecycle.preload)
        await Preloader.waitPreloads(splashScene.lifecycle.preload)
        await Sleep.wait(100) // App 인스턴스가 Document에 마운트되기를 대기합니다.
        return this.app
    }

    async destroy(): Promise<void> {
        if (!this.app) return
        const scenes: Scene[] = this.component.children.lists
        ArrayExtra.clear(scenes)
        await this.app.$nextTick()
        this.app.$destroy()
        this.app = null
    }

    async fullscreen(): Promise<void> {
        if (!this.app) return
        if (screenfull.isEnabled) await screenfull.request(this.app.$el)
    }

    async exitFullscreen(): Promise<void> {
        if (screenfull.isEnabled) await screenfull.exit()
    }

}

export default WeApp


// var a = new WeApp
// Component.setAnimation(a.component.audio, 'playbackRate', 2, 1000).then((current: number): void => {
//     a.component.audio.
// })

// var a = new AnimationRunner
// a.setAnimation(1, 2, 1000, EaseType.Linear).render((current: number, progress: number): void => {
//     a.component.audio.playbackRate = current
// })

// Component.setAnimation(a.component.audio, 'playbackRate', 2, 1000) // 이게 호출된 시점에서 값은 즉시 변경되어야 합니다.
// 하지만 이걸 중간에서 가로채는 프록시 객체가 생성되어야 합니다.
// 저장은 프록시 객체가 합니다. 중간에서 가로채는 프록시 객체는 렌더링과 연결되어 있어야 합니다.
// 프록시 객체를 vue 파일로 대체하면 딱 좋습니다.
// vue 파일은 마운트되면 프록시 객체를 생성하여 body에 저장해야 합니다...
// 컴포넌트가 추가되면, 애니메이션 객체를 받아오고, 애니메이션 객체는 컴포넌트의 모든 정보를 복사해옵니다.
// 

// 애니메이션 진행 정도는 저장되지 않습니다...?
// 콜백은 저장되지 않습니다...
// 이런 방식은 다 좋긴한데 애니메이션 도중은 저장되지 않으니, 그게 문제.

// private component.animation: object
// component constructor(): void { for (const key in this) this.animation[key] = this[key] }