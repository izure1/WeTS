import { Reservation } from './Reservation'
import { EaseType } from '../Utils/ease'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'
import TransitionOption from './TransitionOption'

export default class ComponentInterface extends Component implements TransitionOption {
    readonly name: Reservation = Reservation.Image
    src: string | null = null
    width: 'auto' | number = 'auto'
    height: 'auto' | number = 'auto'
    ease: EaseType = EaseType.Linear
    delay: number = 0
    duration: number = 0

    constructor(data: ComponentData) {
        super(data)
    }
}