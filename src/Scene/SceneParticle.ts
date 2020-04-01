import Scene from './Scene.js'
import ParticleBody from '@/Particle/ParticleBody.js'

class SceneParticle {
    private scene: Scene
    emitters: ParticleBody[][]

    constructor(scene: Scene) {
        this.scene = scene
        this.emitters = []
    }
}

export default SceneParticle