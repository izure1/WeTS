import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private app;
    private scene;
    private body;
    private particles;
    private updateIntervalId;
    private collision;
    /**
     * @description         파티클 입자를 생성합니다.
     */
    private add;
    /**
     * @description         파티클 에미팅을 활성화합니다.
     */
    private generate;
    /**
     * @description         파티클 생성을 중지합니다.
     */
    private stop;
    /**
     * @description         콜라이더를 추가하고, 관련된 모든 충돌 필터값을 받아와 업데이트합니다.
     */
    private setCollider;
    /**
     * @description         콜라이더가 추가되어 콜리전 충돌 필터값이 변경되면, 파티클의 모든 물리 객체의 충돌 필터값을 업데이트합니다.
     */
    private updateCollision;
    private onChangeComponentParticle;
    private onChangeCollision;
    created(): void;
    beforeDestroy(): void;
}
