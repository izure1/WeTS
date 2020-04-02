import Scene from './Scene'
import { SceneType } from './SceneType'

class Scene2d extends Scene {
    private type: SceneType
    constructor() {
        super()
        this.type = SceneType.Scene2D
    }
}

export default Scene2d