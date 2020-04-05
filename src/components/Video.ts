import { Reservation } from './Reservation'
import Component from '@/View/Component'
import ComponentData from '@/View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Video
    width: 'auto' | number = 'auto'
    height: 'auto' | number = 'auto'
    src: string | null = null
    controls: boolean = false
    autoplay: boolean = false
    muted: boolean = false
    loop: boolean = false
    playbackRate: number = 1
    volume: number = 1

    constructor(data: ComponentData) {
        super(data)
    }

    /**
     * 
     * @param time      비디오를 재생할 시간(ms)위치입니다.
     * @description     비디오를 재생합니다. 매개변수로 시간을 넘기면, 해당 위치에서 재생합니다.
     */
    async play(time: number = 0): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const video: HTMLVideoElement = await vue.video
        video.currentTime = time / 1000
        video.play()
    }

    /**
     * @description     비디오 재생을 일지중지합니다.
     */
    async pause(): Promise<void> {
        await Component.waitAttached(this)
        const vue: any = this.vue
        const video: HTMLVideoElement = await vue.video
        video.pause()
    }
}