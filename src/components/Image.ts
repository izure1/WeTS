import { Reservation } from './Reservation.js'
import { EaseType } from '@/Utils/ease.js'
import Component from '@/View/Component.js'
import ComponentData from '@/View/ComponentData.js'
import TransitionOption from './TransitionOption.js'

type ImageSize = 'auto' | number

export default class ComponentInterface extends Component implements TransitionOption {
    name: Reservation = Reservation.Camera
    src: string | null = null
    width: ImageSize = 'auto'
    height: ImageSize = 'auto'
    ease: EaseType = EaseType.Linear
    delay: number = 0
    duration: number = 0

    constructor(data: ComponentData) {
        super(data)
    }
}