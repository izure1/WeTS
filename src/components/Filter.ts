import { Reservation } from './Reservation.js'
import { EaseType } from '@/Utils/ease.js'
import Component from '@/View/Component.js'
import ComponentData from '@/View/ComponentData.js'
import TransitionOption from './TransitionOption.js'

export default class ComponentInterface extends Component implements TransitionOption {
    name: Reservation = Reservation.Filter
    blur: number = 0
    brightness: number = 1
    contrast: number = 1
    grayscale: number = 0
    invert: number = 0
    opacity: number = 1
    saturate: number = 1
    sepia: number = 0
    backgroundColor: string = 'transparent'
    cursor: string = 'default'
    ease: EaseType = EaseType.Linear
    delay: number = 0
    duration: number = 0

    constructor(data: ComponentData) {
        super(data)
    }
}