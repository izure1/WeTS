import Particle from './Particle.js'
import Matter from 'matter-js'

export default interface ParticleBody {
    id: string
    particle: Particle
    object: Matter.Body
}