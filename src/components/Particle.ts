import { Reservation } from './Reservation'
import Component from '../View/Component'
import ComponentData from '../View/ComponentData'
import EmitterOption from '../Particle/EmitterOption'
import ParticleOption from '../Particle/ParticleOption'

export default class ComponentInterface extends Component implements EmitterOption, ParticleOption {
    private static EmptyImage: string = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    readonly name: Reservation = Reservation.Particle
    private readonly colliders: string[] = []
    speed: number = 0.001
    interval: number = 100
    quantity: number = 1
    src: string = ComponentInterface.EmptyImage
    start: number = 1
    end: number = 0
    duration: number = 1000
    frictionAir: number = 0.05
    perspective: number = 0

    constructor(data: ComponentData) {
        super(data)
    }
}