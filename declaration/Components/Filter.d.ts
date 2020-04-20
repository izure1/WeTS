import { Reservation } from './Reservation';
import { EaseType } from '../Utils/ease';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
import TransitionOption from './TransitionOption';
export default class ComponentInterface extends Component implements TransitionOption {
    readonly name: Reservation;
    blur: number;
    brightness: number;
    contrast: number;
    grayscale: number;
    invert: number;
    opacity: number;
    saturate: number;
    sepia: number;
    backgroundColor: string;
    cursor: string;
    ease: EaseType;
    delay: number;
    duration: number;
    constructor(data: ComponentData);
}
