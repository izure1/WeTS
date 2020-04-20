import { Reservation } from './Reservation'
import { EaseType } from '../Utils/ease'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'
import TransitionOption from './TransitionOption'

export default class ComponentInterface extends Component implements TransitionOption {
    readonly name: Reservation = Reservation.Filter
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