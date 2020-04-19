import { Reservation } from './Reservation';
import Component from '@/View/Component';
import ComponentData from '@/View/ComponentData';
export default class ComponentInterface extends Component {
    readonly name: Reservation;
    x: number;
    y: number;
    z: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    scale: number;
    width: 'auto' | number;
    height: 'auto' | number;
    constructor(data: ComponentData);
}
