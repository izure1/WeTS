import { Reservation } from './Reservation.js'
import Component from '../View/Component.js'

export default class ComponentInterface extends Component {
    name: Reservation = Reservation.Children
    lists: string[] = []
}