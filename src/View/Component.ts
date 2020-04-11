import Vue from 'vue'
import EventEmitter from 'eventemitter3'
import ComponentData from './ComponentData'
import { Reservation } from '@/Components/Reservation'
import { AnimationRunnerGroup } from '@/Utils/Animation'
import { EaseType } from '@/Utils/ease'

class Component extends EventEmitter implements ComponentData {
    vue: Vue.Component | null = null
    private vue_ready: Promise<any> = new Promise(resolve => { this.vue_init = resolve })
    private vue_init!: () => void
    private animation: AnimationRunnerGroup = new AnimationRunnerGroup
    name: Reservation
    [key: string]: any

    constructor(info: ComponentData) {
        super()
        this.name = info.name
        Object.assign(this, info)
    }

    /**
     * 
     * @param target        대상 컴포넌트입니다.
     * @param key           애니메이션 효과를 줄 속성명입니다.
     * @param value         변경될 값을 지정합니다.
     * @param duration      몇 초에 걸쳐서 변경될지 시간(ms)을 지정합니다.
     * @param ease          가속도를 지정합니다.
     */
    static setAnimation(target: Component, key: string, value: number, duration: number, ease: EaseType = EaseType.Linear): void {
        // 존재하지 않는 프로퍼티일 경우 진행하지 않습니다.
        if (!Object.prototype.hasOwnProperty.call(target, key))
            return
        // 프로퍼티가 존재하지만 숫자형이 아닐 경우, 진행하지 않습니다.
        if (typeof target[key] !== 'number')
            return
        // 이미 애니메이션이 존재할 경우, 삭제합니다.
        if (target.animation.has(key))
            target.animation.delete(key)
        // 새로운 애니메이션을 생성합니다.
        target.animation.run(key, target[key], value, duration, ease)
    }

    /**
     * 
     * @param target        대상 컴포넌트입니다.
     * @param deltaTime     이전에 했던 업데이트 시각과 현재 했던 시각의 차이입니다.
     */
    static updateAnimation(target: Component, deltaTime: number): void {
        target.animation.update(deltaTime)
    }

    /**
     * 
     * @param component     대상 컴포넌트입니다.
     * @description         대상 컴포넌트에 attachVue 메서드로 지정한 vue 인스턴스가 완료되는 시점에 해결되는 프로미스를 반환합니다.
     */
    static waitAttached(component: Component): Promise<any> {
        return component.vue_ready
    }

    /**
     * 
     * @param component     대상 컴포넌트입니다.
     * @param vue           감시할 Vue.Component 인스턴스입니다.
     * @description         component.vue_init 메서드로 vue 인스턴스가 완료되는 시점을 호출할 수 있습니다.
     */
    static attachVue(component: Component, vue: Vue.Component): Vue.Component {
        component.vue = vue
        component.vue_init()
        return component.vue
    }
}

export default Component