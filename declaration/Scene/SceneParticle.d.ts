import Scene from './Scene';
import ParticleBody from '../Particle/ParticleBody';
declare class SceneParticle {
    private scene;
    readonly emitters: ParticleBody[][];
    constructor(scene: Scene);
}
export default SceneParticle;
