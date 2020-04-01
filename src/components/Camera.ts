import { Reservation } from './Reservation.js'
import Component from '@/View/Component.js'
import ComponentData from '@/View/ComponentData.js'

export default class ComponentInterface extends Component {
    name: Reservation = Reservation.Camera
    x: number = 0
    y: number = 0
    z: number = 0
    rotateX: number = 0
    rotateY: number = 0
    rotateZ: number = 0

    constructor(data: ComponentData) {
        super(data)
    }
}