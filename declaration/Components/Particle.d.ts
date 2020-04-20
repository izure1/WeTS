import { Reservation } from './Reservation';
import Component from '../View/Component';
import ComponentData from '../View/ComponentData';
import EmitterOption from '../Particle/EmitterOption';
import ParticleOption from '../Particle/ParticleOption';
export default class ComponentInterface extends Component implements EmitterOption, ParticleOption {
    private static EmptyImage;
    readonly name: Reservation;
    private readonly colliders;
    speed: number;
    interval: number;
    quantity: number;
    src: string;
    start: number;
    end: number;
    duration: number;
    frictionAir: number;
    perspective: number;
    constructor(data: ComponentData);
}
