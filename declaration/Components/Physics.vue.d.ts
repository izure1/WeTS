import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private app;
    private scene;
    private body;
    private physicsObject;
    private tracking;
    private bodySize;
    private scale;
    private inertia;
    private category;
    /**
     * @description     물리객체의 충돌필터값을 재설정합니다.
     */
    private setCollider;
    /**
     * @description     객체의 크기가 변경되었을 때, bodySize 변수를 수정하여, @Watch 에서 해결합니다.
     */
    private onChangeSize;
    /**
     * @description     물리객체의 회전여부를 지정합니다.
     */
    private setFixedRotation;
    /**
     * @description     물리객체의 마찰값을 지정합니다.
     */
    private setFriction;
    /**
     * @description     물리객체의 탄성력을 지정합니다.
     */
    private setRestitution;
    /**
     * @description     물리객체의 고정여부를 지정합니다.
     */
    private setStatic;
    private createPhysics;
    /**
     * @description         물리 인스턴스를 파괴합니다.
     */
    private destroyPhysics;
    /**
     * @description         물리객체의 transform 상태를 변경합니다. 이는 View 인스턴스의 transform 컴포넌트값을 수동으로 수정했을 때, 물리객체에 적용하는 메서드입니다.
     */
    private transform;
    /**
     * @description         물리객체의 위치 변화에 따라, View 인스턴스의 transform 컴포넌트 값을 수정합니다.
     */
    private translate;
    /**
     * @description         View 인스턴스의 transform 컴포넌트를 직접 수정할 경우, 물리를 추적하지 않습니다.
     */
    private onChangeTransformX;
    private onChangeTransformY;
    private onChangeTransformRotateZ;
    private onChangeTransformScale;
    private onChangePhysicsType;
    private onChangePhysicsFriction;
    private onChangePhysicsFrictionAir;
    private onChangePhysicsFrictionStatic;
    private onChangePhysicsRestitution;
    private onChangePhysicsFixed;
    private onChangePhysicsColliders;
    private onChangeBodysize;
    created(): void;
    beforeDestroy(): void;
}
