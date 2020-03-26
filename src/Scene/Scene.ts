import { Reservation } from '@/Components/Reservation.js'
import View from '@/View/View.js'
import ComponentList from '@/View/ComponentList.js'
import ComponentFactory from '@/View/ComponentFactory.js'

class Scene extends View {
    //physics: 
    constructor() {
        super()
        ComponentList.add(this.component, ComponentFactory.create(Reservation.Children))

        /*
         *  씬 객체는 내부적으로 컴포넌트가 아닌, 물리 세계(physics-world)를 가지고 있습니다.
         *  씬의 children 컴포넌트로 추가된 하위 객체들은, physics 컴포넌트로 물리효과를 만들 시 물리 세계를 참조합니다.
         *  Ex) scene.physicsWorld.yourJob
         * 
         *  씬의 물리세계는 수정하거나 파괴할 수 없습니다.
         * 
         */
        //this.physics =
    }
}

export default Scene