import Particle from './Particle'
import Matter from 'matter-js'

export default interface ParticleBody {
    id: string
    particle: Particle
    object: Matter.Body
}