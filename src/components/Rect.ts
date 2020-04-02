import { Reservation } from './Reservation'
import Component from '@/View/Component'
import ComponentData from '@/View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Rect
    width: number = 100
    height: number = 100
    borderWidth: number = 0
    borderColor: string = 'black'
    color: string = 'red'

    constructor(data: ComponentData) {
        super(data)
    }
}