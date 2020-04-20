import { Reservation } from './Reservation'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'

export default class ComponentInterface extends Component {
    readonly name: Reservation = Reservation.Html
    content: string = ''

    constructor(data: ComponentData) {
        super(data)
    }
}