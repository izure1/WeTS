import View from '../View/View';
import ScenePhysics from './ScenePhysics';
import SceneParticle from './SceneParticle';
declare class Scene extends View {
    readonly physics: ScenePhysics;
    readonly particle: SceneParticle;
    constructor();
    /**
     *
     * @param e         이벤트 타입입니다.
     * @param params    이벤트의 콜백함수에서 넘겨받을 매개변수입니다.
     * @description     emit 메서드와 사용법은 똑같지만, 이 씬에 소속된 모든 View 인스턴스에게 이벤트를 발생시킵니다.
     */
    broadcast(e: string, ...params: any): void;
    /**
     * @description     씬의 모든 내용을 초기화합니다.
     */
    clear(): Promise<void>;
    /**
     *
     * @param scene     실행할 뷰 또는 씬입니다.
     * @description     이 씬의 하위 씬을 삽입합니다. 추가할 씬의 preload가 실행되고 나서, 현재 씬에 추가됩니다.
     */
    addScene(scene: View): Promise<void>;
    /**
     *
     * @param scene     실행할 뷰 또는 씬입니다.
     * @description     현재 씬에서 실행 중인 씬을 삭제합니다.
     */
    dropScene(scene: View): Promise<void>;
    /**
     *
     * @param scenes    실행할 뷰 또는 씬입니다.
     * @description     addScene 메서드와의 차이점은, ㅎ녀재 씬에서 실행 중인 기존의 하위 씬들을 전부 삭제하고, 실행한다는 점입니다. 또한 여러 씬을 동시에 추가할 수 있습니다.
     */
    launch(...scenes: View[]): Promise<void>;
}
export default Scene;
