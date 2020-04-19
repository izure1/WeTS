import { Vue } from 'vue-property-decorator';
export default class WeBody extends Vue {
    private app;
    private scene;
    private body;
    private requiredLevels;
    private LevelDesign;
    private updateRequestId;
    private sizeObserver;
    private sizeSelf;
    private sizeChild;
    private sizeMax;
    private SCENE_2D;
    private SCENE_3D;
    get centerPointX(): number;
    get centerPointY(): number;
    get isScene(): boolean;
    /**
     * @description         주어진 값을 View 인스턴스 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    parseBodySize(v: string | number): string | number;
    /**
     * @description     ResizeObserver 인스턴스를 만듭니다. 이 View 인스턴스가 mounted 된 시점에 생성되며, 컴포넌트로 인한 크기 변화가 일어났을 경우, 이를 감지하여 상위 View 인스턴스로 전달합니다.
     */
    private startResizeObserve;
    /**
     * @description     ResizeObserver 인스턴스를 파괴하여 메모리를 회수합니다.
     */
    private destroyResizeObserve;
    /**
     * @description     View 인스턴스의 라이프사이클을 시작합니다.
     */
    private startBodyCycle;
    /**
     * @description     View 인스턴스의 라이프사이클을 파괴합니다.
     */
    private destroyBodyCycle;
    /**
     * @description     주어진 값을 이용하여 객체의 좌표를 렌더링합니다.
     */
    private translate;
    /**
     * @description     사용자 입력 이벤트를 발생시킵니다.
     */
    private emitUserInput;
    private onChangeSize;
    /**
     * @description     View 인스턴스의 크기가 변경되었을 때, 다시 크기를 계산하여 상위 View 인스턴스로 전달합니다.
     */
    private calcSizeMax;
    private isNeedFromScene;
    private hasComponent;
    private onChangeSelfSize;
    private onChangeSelfChild;
    private onChangeTransform;
    private onChangeCollision;
    mounted(): void;
    beforeDestroy(): void;
}
