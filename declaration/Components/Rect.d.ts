import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    width: number;
    height: number;
    borderWidth: number;
    borderColor: string;
    color: string;
    constructor(data: ComponentData);
}
