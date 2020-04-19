import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private emitters;
    private app;
    private scene;
    private body;
    private AssetLoader;
    /**
     * @description     파티클 객체의 크기를 계산하여 중앙 x좌표를 반환합니다.
     */
    private centerPointX;
    /**
     * @description     파티클 객체의 크기를 계산하여 중앙 y좌표를 반환합니다.
     */
    private centerPointY;
    /**
     * @description     파티클 객체의 z좌표를 반환합니다. TODO: 크기 계산이 제대로 안되고 있습니다. 좀 더 고쳐야 함.
     */
    private centerPointZ;
}
