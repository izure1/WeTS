import Scene from './Scene'
import ParticleBody from '../Particle/ParticleBody'

class SceneParticle {
    private scene: Scene
    readonly emitters: ParticleBody[][] = []

    constructor(scene: Scene) {
        this.scene = scene
    }
}

export default SceneParticle