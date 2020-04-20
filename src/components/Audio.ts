import { Reservation } from './Reservation'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'
import { Howl } from 'howler'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Audio
    src: string | null = null
    muted: boolean = false
    loop: boolean = false
    playbackRate: number = 1
    volume: number = 1
    recaching: number = 150

    constructor(data: ComponentData) {
        super(data)
    }

    /**
     * 
     * @param time      오디오를 재생할 시간(ms)위치입니다.
     * @description     오디오를 재생합니다. 매개변수로 시간을 넘기면, 해당 위치에서부터 재생합니다.
     */
    async play(time: number = 0): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const audio: Howl = await vue.audio
        audio.stop()
        audio.play()
        audio.seek(time / 1000)
    }
    
    /**
     * 
     * @param time      오디오를 재생할 시간(ms)위치입니다.
     * @description     오디오를 재생합니다. 이미 재생 중일 경우, 재생하지 않습니다. 매개변수로 시간을 넘기면, 해당 위치에서부터 재생합니다.
     */
    async playLazy(time: number = 0): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const audio: Howl = await vue.audio
        if (!audio.playing())
            this.play(time)
    }

    /**
     * @description     오디오가 재생 중인지 여부를 반환합니다.
     */
    async isPlaying(): Promise<boolean> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const audio: Howl = await vue.audio
        return audio.playing()
    }

    /**
     * @description     오디오를 일시정지합니다.
     */
    async pause(): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const audio: Howl = vue.audio
        audio.pause()
    }

    /**
     * @description     오디오를 정지합니다.
     */
    async stop(): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const audio: Howl = vue.audio
        audio.stop()
    }
}