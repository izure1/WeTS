import Vue from 'vue'
import EventEmitter from 'eventemitter3'
import ComponentData from './ComponentData'
import { Reservation } from '@/Components/Reservation'

class Component extends EventEmitter implements ComponentData {
    vue: Vue.Component | null = null
    private vue_ready: Promise<any> = new Promise(resolve => { this.vue_init = resolve })
    private vue_init!: () => void
    name: Reservation
    [key: string]: any

    constructor(info: ComponentData) {
        super()
        this.name = info.name
        Object.assign(this, info)
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