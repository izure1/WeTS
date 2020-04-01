import Scene from './Scene.js'
import { SceneType } from './SceneType.js'

class Scene3d extends Scene {
    private type: SceneType
    constructor() {
        super()
        this.type = SceneType.Scene3D
    }
}

export default Scene3d