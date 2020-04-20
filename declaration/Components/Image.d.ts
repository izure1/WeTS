import { Reservation } from './Reservation';
import { EaseType } from '../Utils/ease';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
import TransitionOption from './TransitionOption';
export default class ComponentInterface extends Component implements TransitionOption {
    readonly name: Reservation;
    src: string | null;
    width: 'auto' | number;
    height: 'auto' | number;
    ease: EaseType;
    delay: number;
    duration: number;
    constructor(data: ComponentData);
}
