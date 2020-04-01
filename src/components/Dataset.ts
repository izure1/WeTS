import { Reservation } from './Reservation.js'
import Component from '../View/Component.js'
import ComponentData from '@/View/ComponentData.js'

export default class ComponentInterface extends Component {
    name: Reservation = Reservation.Dataset
    lists: string[] = []

    constructor(data: ComponentData) {
        super(data)
    }
}