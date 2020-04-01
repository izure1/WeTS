import EventEmitter from 'eventemitter3'
import { Random } from '@/Utils/MathUtil.js'
import { Reservation } from '@/Components/Reservation.js'
import Tick from '@/Utils/Tick.js'
import ComponentList from './ComponentList.js'
import ComponentFactory from './ComponentFactory.js'
import LevelDesign from './LevelDesign.js'

interface LifeCycle {
    preload: Function[]
    start: Function[]
    update: Function[]
    destroy: Function[]
    dataTransfer: Map<string, any>
}

class View extends EventEmitter {
    uid: string = Random.shortid()
    lifecycle: LifeCycle = {
        preload: [],
        start: [],
        update: [],
        destroy: [],
        dataTransfer: new Map,
    }
    id: null | string = null
    tags: string[] = []
    level: string = LevelDesign.PERSISTENT_LEVEL
    levelDesign: LevelDesign = new LevelDesign
    component: ComponentList = new ComponentList

    constructor() {
        super()
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Camera))
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Transform))
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Filter))
    }

    onPreload(fn: Function): View {
        this.lifecycle.preload.push(fn.bind(this))
        return this
    }

    onStart(fn: Function): View {
        this.lifecycle.start.push(fn.bind(this))
        return this
    }

    onUpdate(fn: Function): View {
        this.lifecycle.update.push(fn.bind(this))
        return this
    }

    onDestroy(fn: Function): View {
        this.lifecycle.destroy.push(fn.bind(this))
        return this
    }

    cycleStart(): void {
        this.lifecycle.start.forEach(fn => fn(this.lifecycle.dataTransfer))
    }

    cycleUpdate(): string {
        return Tick.request((step: number, deltaTime: number) => {
            this.lifecycle.update.forEach(fn => fn(this.lifecycle.dataTransfer, deltaTime))
        })
    }

    cycleDestroy(tick: string): void {
        Tick.cancelRequest(tick)
        this.lifecycle.destroy.forEach(fn => fn(this.lifecycle.dataTransfer))
    }
}

export default View