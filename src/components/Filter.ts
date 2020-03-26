import { Reservation } from './Reservation'
import Component from '@/View/Component';
import ComponentData from '@/View/ComponentData';

export default class ComponentInterface extends Component {
    name: Reservation = Reservation.Filter
    blur: number = 0
    brightness: number = 1
    contrast: number = 1
    grayscale: number = 0
    invert: number = 0
    opacity: number = 1
    saturate: number = 1
    sepia: number = 0
    duration: number = 0
    delay: number = 0
    backgroundColor: string = 'transparent'
    ease: string = 'linear'
    cursor: string = 'default'

    constructor(data: ComponentData) {
        super(data)
    }
}