import Vue from 'vue'
import Scene from '@/Scene/Scene.js'
import Scene3d from '@/Scene/Scene3d.js'
import ArrayExtra from '@/Utils/ArrayExtra.js'
import Preloader from '@/Utils/Preloader.js'
import Sleep from '@/Utils/Sleep.js'
import screenfull from 'screenfull'
import App from './App.vue'

type Vector = [number, number]

class WeApp extends Scene3d {
    private width: number = 800
    private height: number = 450
    private perspective: number = 100
    private element: HTMLElement | null = null
    private app: Vue | null = null

    constructor() {
        super()
    }

    get appElement(): Element | null {
        if (!this.app) return null
        return this.app.$el
    }

    get size(): Vector {
        return [this.width, this.height]
    }

    set size(v: Vector) {
        this.width = v[0]
        this.height = v[1]
    }

    async start(splashScene: Scene = new Scene): Promise<Vue> {
        const scenes: Scene[] = this.component.children.lists
        ArrayExtra.clear(scenes)
        ArrayExtra.add(scenes, splashScene)
        if (this.element)
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