import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    readonly lists: string[];
    constructor(data: ComponentData);
}
