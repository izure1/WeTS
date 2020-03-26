import EventEmitter from 'eventemitter3'
import ParticleOption from './ParticleOption.js'

class Particle extends EventEmitter implements ParticleOption {
    private naturalWidth: number = 0
    private naturalHeight: number = 0
    private step: number = 0
    src: string = ''
    start: number = 1
    end: number = 0
    duration: number = 1000
    frictionAir: number = 0.05
    perspective: number = 0

    constructor(naturalWidth: number, naturalHeight: number, perspective: number) {
        super()
        this.naturalWidth = naturalWidth
        this.naturalHeight = naturalHeight
        this.perspective = perspective
    }

    get progress(): number {
        return this.step / this.duration
    }

    get scale(): number {
        const { start, end, progress } = this
        return start - (progress * (start - end))
    }

    get width(): number {
        return this.naturalWidth * this.scale
    }

    get height(): number {
        return this.naturalHeight * this.scale
    }

    /**
     * 
     * @param deltaTime  이전과 현재 update 메서드를 호출한 사이 간격 시간(ms)입니다.
     */
    update(deltaTime: number) {
        this.step += deltaTime
        if (this.step > this.duration) {
            this.step = 0
            this.emit('particle-life-end')
        }
    }
}

export default Particle