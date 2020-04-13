import EventEmitter from 'eventemitter3'
import { Random } from '@/Utils/MathUtil'
import { Reservation } from '@/Components/Reservation'
import Tick from '@/Utils/Tick'
import ComponentList from './ComponentList'
import ComponentFactory from './ComponentFactory'
import LevelDesign from './LevelDesign'

interface LifeCycle {
    preload:        ((dataTransfer: Map<string, any>) => Promise<void>)[]
    start:          ((dataTransfer: Map<string, any>) => Promise<void>)[]
    update:         ((dataTransfer: Map<string, any>, deltaTime: number) => Promise<void>)[]
    destroy:        ((dataTransfer: Map<string, any>) => Promise<void>)[]
    dataTransfer:   Map<string, any>
}

class View extends EventEmitter {
    readonly uid: string = Random.shortid()
    readonly lifecycle: LifeCycle = {
        preload: [],
        start: [],
        update: [],
        destroy: [],
        dataTransfer: new Map,
    }
    readonly tags: string[] = []
    readonly levelDesign: LevelDesign = new LevelDesign
    readonly component: ComponentList = new ComponentList
    id: null | string = null
    level: string = LevelDesign.PersistentLevel

    constructor() {
        super()
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Camera))
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Transform))
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Filter))
    }

    /**
     * 
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 준비 단계에 진입했을 때 콜백 함수를 호출합니다.
     */
    onPreload(fn: (dataTransfer: Map<string, any>) => Promise<void>): View {
        this.lifecycle.preload.push(fn.bind(this))
        return this
    }

    /**
     * 
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 화면에 보여지기 시작할 때 콜백 함수를 호출합니다.
     */
    onStart(fn: (dataTransfer: Map<string, any>) => Promise<void>): View {
        this.lifecycle.start.push(fn.bind(this))
        return this
    }

    /**
     * 
     * @param fn        실행될 콜백 함수입니다.
     * @description     매 프레임마다 콜백 함수를 호출합니다.
     */
    onUpdate(fn: (dataTransfer: Map<string, any>, deltaTime: number) => Promise<void>): View {
        this.lifecycle.update.push(fn.bind(this))
        return this
    }

    /**
     * 
     * @param fn        실행될 콜백 함수입니다.
     * @description     이 인스턴스가 파괴될 때 콜백 함수를 호출합니다.
     */
    onDestroy(fn: (dataTransfer: Map<string, any>) => Promise<void>): View {
        this.lifecycle.destroy.push(fn.bind(this))
        return this
    }

    /**
     * @description     onStart 메서드로 등록한 콜백 함수를 호출합니다.
     */
    cycleStart(): void {
        this.lifecycle.start.forEach(fn => fn(this.lifecycle.dataTransfer))
    }

    /**
     * @description     onUpdate 메서드로 등록한 콜백 함수를 호출합니다.
     * @returns         매 프레임마다 호출하는 애니메이션프레임의 고유값입니다.
     */
    cycleUpdate(): string {
        return Tick.request((step: number, deltaTime: number) => {
            this.lifecycle.update.forEach(fn => fn(this.lifecycle.dataTransfer, deltaTime))
        })
    }

    /**
     * 
     * @param tick      매 프레임마다 호출하는 애니메이션프레임의 고유값입니다. cycleUpdate 메서드의 반환값을 넘기십시오.
     * @description     onDestroy 메서드로 등록한 콜백 함수를 호출합니다.
     */
    cycleDestroy(tick: string): void {
        Tick.cancelRequest(tick)
        this.lifecycle.destroy.forEach(fn => fn(this.lifecycle.dataTransfer))
    }
}

export default View