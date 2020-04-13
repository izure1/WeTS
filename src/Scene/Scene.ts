import { Reservation } from '@/Components/Reservation'
import View from '@/View/View'
import ComponentList from '@/View/ComponentList'
import ComponentFactory from '@/View/ComponentFactory'
import ScenePhysics from './ScenePhysics'
import ArrayExtra from '@/Utils/ArrayExtra'
import Preloader from '@/Utils/Preloader'
import SceneParticle from './SceneParticle'

class Scene extends View {
    /*
     *  씬 객체는 내부적으로 컴포넌트가 아닌, 물리 세계(physics-world)를 가지고 있습니다.
     *  씬의 children 컴포넌트로 추가된 하위 객체들은, physics 컴포넌트로 물리효과를 만들 시 물리 세계를 참조합니다.
     *  Ex) scene.physicsWorld.yourJob
     * 
     *  씬의 물리세계는 수정하거나 파괴할 수 없습니다.
     * 
     */
    readonly physics: ScenePhysics = new ScenePhysics
    readonly particle: SceneParticle = new SceneParticle(this)

    constructor() {
        super()
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Children))
    }

    /**
     * 
     * @param e         이벤트 타입입니다.
     * @param params    이벤트의 콜백함수에서 넘겨받을 매개변수입니다.
     * @description     emit 메서드와 사용법은 똑같지만, 이 씬에 소속된 모든 View 인스턴스에게 이벤트를 발생시킵니다.
     */
    broadcast(e: string, ...params: any): void {
        const childrens: View[] = this.component.children.lists
        for (const children of childrens)
            children.emit(e, ...params)
    }

    /**
     * @description     씬의 모든 내용을 초기화합니다.
     */
    async clear(): Promise<void> {
        ArrayExtra.clear(this.component.children.lists)
        ArrayExtra.clear(this.particle.emitters)
        this.lifecycle.dataTransfer.clear()
        this.physics.stop()
    }

    /**
     * 
     * @param scene     실행할 뷰 또는 씬입니다.
     * @description     이 씬의 하위 씬을 삽입합니다. 추가할 씬의 preload가 실행되고 나서, 현재 씬에 추가됩니다.
     */
    async addScene(scene: View): Promise<void> {
        if (!(scene instanceof View)) throw 'The scene argument must be WeJS.View instance.'
        await Preloader.waitPreloads(scene.lifecycle.preload, scene.lifecycle.dataTransfer)
        ArrayExtra.add(this.component.children.lists, scene)
    }

    /**
     * 
     * @param scene     실행할 뷰 또는 씬입니다.
     * @description     현재 씬에서 실행 중인 씬을 삭제합니다.
     */
    async dropScene(scene: View): Promise<void> {
        if (!(scene instanceof View)) throw 'The scene argument must be WeJS.View instance.'
        ArrayExtra.delete(this.component.children.lists, scene)
    }

    /**
     * 
     * @param scenes    실행할 뷰 또는 씬입니다.
     * @description     addScene 메서드와의 차이점은, ㅎ녀재 씬에서 실행 중인 기존의 하위 씬들을 전부 삭제하고, 실행한다는 점입니다. 또한 여러 씬을 동시에 추가할 수 있습니다.
     */
    async launch(...scenes: View[]) {
        ArrayExtra.clear(this.component.children.lists)
        await Promise.all(scenes.map(scene => this.addScene(scene)))
    }
}

export default Scene