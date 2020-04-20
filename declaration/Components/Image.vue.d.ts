import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private app;
    private scene;
    private body;
    private AssetLoader;
    /**
     * @description         주어진 값을 이미지 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    parseImageSize(v: string | number): string | number;
}
