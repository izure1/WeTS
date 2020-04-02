import Scene from './Scene'
import { SceneType } from './SceneType'

class Scene3d extends Scene {
    private type: SceneType
    constructor() {
        super()
        this.type = SceneType.Scene3D
    }
}

export default Scene3d