import Scene from './Scene.js'
import { SceneType } from './SceneType.js'

class Scene2d extends Scene {
    private type: SceneType
    constructor() {
        super()
        this.type = SceneType.Scene2D
    }
}

export default Scene2d