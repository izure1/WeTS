import { Vue } from 'vue-property-decorator';
export default class VueComponent extends Vue {
    private app;
    private scene;
    private body;
    private readonly AssetLoader;
    private start;
    private video;
    private setVideo;
    /**
     * @description         주어진 값을 비디오 사이즈에 사용할 수 있는 형식으로 변환합니다.
     */
    private parseVideoSize;
    private onChangePlaybackRate;
    private onChangeVolume;
    created(): void;
    mounted(): void;
}
